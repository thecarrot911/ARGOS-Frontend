import { Component, OnInit, Type, Input, EventEmitter, Output } from '@angular/core';
import { Empleado } from '../../empleados';
import { HorarioService } from '../../services/horario.service';
import { ActualizacionService } from '../../services/actualizacion.service';
import { Tipo, Actualizacion } from '../../actualizacion';
import { Planificacion } from 'src/app/UltimaPlanificacion';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-agregarActualizacion',
    templateUrl: './agregarActualizacion.component.html',
    styleUrls: ['./agregarActualizacion.component.css']
})


export class AgregarActualizacionComponent implements OnInit {


    // Variable que recibe de schedule 
    @Input() planificacion_id: number;
    @Input() diasPlanificacion: Planificacion;

    // Se emite el evento para reiniciar el component schedule
    @Output() recargarPagina = new EventEmitter();

    public ArrayEmpleadoSolicitante: Empleado[];
    public ArrayEmpleadoReemplazante: Empleado[];

    public ArrayTipo: Tipo[];

    fecha = new Date();
    anio = this.fecha.getFullYear();
    mes = this.fecha.getMonth() + 1; // Los meses se indexan desde 0, por lo que se suma 1
    dia = this.fecha.getDate();

    FormatoFecha = `${this.anio}-${this.mes}-${this.dia}`;


    constructor(
        private horarioService: HorarioService,
        private actualizacionService: ActualizacionService,
        private datePipe: DatePipe
    ) {
    }

    ngOnInit(): void {
        this.actualizacionService.MostrarFormulario(this.planificacion_id).subscribe(
            response =>{
                this.ArrayTipo = response.data.actualizacion
                this.ArrayEmpleadoSolicitante = response.data.solicitante
                this.ArrayEmpleadoReemplazante = response.data.empleados

            },  
            error =>{
                console.error(error)
            }
        )
    }

    actualizacion: Actualizacion = {
        rut: null,
        planificacion_id: null,
        descripcion: null,
        fecha: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
        fecha_inicio: null,
        fecha_termino: null,
        tipo_id: null,
        reemplazo: null
    }

    FiltrandoSelect(){
        this.ArrayEmpleadoReemplazante = this.ArrayEmpleadoReemplazante.filter(emp =>  emp.rut != this.actualizacion.rut)
    }
    
    EnviarActualizacion(): void{
        
        this.actualizacion.planificacion_id = this.planificacion_id;
        
        this.actualizacionService.RegistrarActualizacion(this.actualizacion).subscribe(
            response =>{
                this.horarioService.modalAddActualizacion = !this.horarioService.modalAddActualizacion;
                this.recargarPagina.emit();
                console.log(response)
            }, 
            error =>{
                console.log(error)
            }
        )
    }

    Cerrar(): void {
        this.horarioService.modalAddActualizacion = !this.horarioService.modalAddActualizacion
    }

}
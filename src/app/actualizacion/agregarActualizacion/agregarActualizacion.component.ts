import { Component, OnInit, Type, Input, EventEmitter, Output } from '@angular/core';
import { Empleado } from '../../empleados';
import { AllempleadosService } from '../../services/allempleados.service';
import { HorarioService } from '../../services/horario.service';
import { ActualizacionService } from '../../services/actualizacion.service';
import { Tipo, Actualizacion } from '../../actualizacion';


@Component({
    selector: 'app-agregarActualizacion',
    templateUrl: './agregarActualizacion.component.html',
    styleUrls: ['./agregarActualizacion.component.css']
})


export class AgregarActualizacionComponent implements OnInit {


    // Variable que recibe de schedule 
    @Input() planificacion_id: number;
    
    // Se emite el evento para reiniciar el component schedule
    @Output() recargarPagina = new EventEmitter();

    public ArrayEmpleadoSolicitante: Empleado[];
    public ArrayEmpleadoReemplazante: Empleado[];

    public ArrayTipo: Tipo[];

    constructor(
        private horarioService: HorarioService,
        private actualizacionService: ActualizacionService
    ) {}

    ngOnInit(): void {
        this.actualizacionService.MostrarFormulario(this.planificacion_id).subscribe(
            response =>{
                this.ArrayTipo = response.data.actualizacion
                this.ArrayEmpleadoSolicitante = response.data.solicitante
                this.ArrayEmpleadoReemplazante = response.data.empleados
                console.log(this.planificacion_id)
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
            }, 
            error =>{

            }
        )
        
    }

    Cerrar(): void {
        this.horarioService.modalAddActualizacion = !this.horarioService.modalAddActualizacion
    }

}
import { Component, OnInit, Type, Input, EventEmitter, Output } from '@angular/core';
import { Empleado } from '../../empleados';
import { HorarioService } from '../../services/horario.service';
import { ActualizacionService } from '../../services/actualizacion.service';
import { Tipo, Actualizacion } from '../../actualizacion';
import { Planificacion } from 'src/app/UltimaPlanificacion';


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

    constructor(
        private horarioService: HorarioService,
        private actualizacionService: ActualizacionService
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

        const fechaInicio = new Date(this.actualizacion.fecha_inicio);
        fechaInicio.setUTCHours(0, 0, 0, 0); // Ajustar la hora a las 00:00:00 en UTC
        const diaInicio = fechaInicio.getUTCDate();

        const fechaTermino = new Date(this.actualizacion.fecha_termino);
        fechaTermino.setUTCHours(0, 0, 0, 0); // Ajustar la hora a las 00:00:00 en UTC
        const diaTermino = fechaTermino.getUTCDate();
    
        this.actualizacion.fecha_inicio

        console.log(diaInicio); // Imprime el día correctamente
        console.log(diaTermino); // Imprime el día correctamente

        //console.log(new Date(this.actualizacion.fecha_inicio).getDate())
        //console.log(new Date(this.actualizacion.fecha_termino).getDate())

        this.actualizacionService.RegistrarActualizacion(this.actualizacion).subscribe(
            response =>{
                this.horarioService.modalAddActualizacion = !this.horarioService.modalAddActualizacion;
                //this.recargarPagina.emit();
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
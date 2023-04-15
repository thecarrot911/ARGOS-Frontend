import { Component, OnInit, Type, Input, EventEmitter, Output } from '@angular/core';
import { Empleado } from '../../empleados';
import { AllempleadosService } from '../../services/allempleados.service';
import { HorarioService } from '../../services/horario.service';
import { DatePipe } from '@angular/common';
import { ActualizacionService } from '../../services/actualizacion.service';
import { RespuestaTipo, Tipo, Actualizacion } from '../../actualizacion';


@Component({
    selector: 'app-agregarActualizacion',
    templateUrl: './agregarActualizacion.component.html',
    styleUrls: ['./agregarActualizacion.component.css']
})


export class AgregarActualizacionComponent implements OnInit {


    // Variable que recibe de schedule 
    @Input() planificacion_id: number;
    
    // Se emite el evento para reiniciar el component schedule
    //@Output() recargarPagina = new EventEmitter();

    public ArrayEmpleadoSolicitante: Empleado[];
    public ArrayEmpleadoReemplazante: Empleado[];

    public fecha: any;
    public ArrayTipo: Tipo[];

    constructor(
        private horarioService: HorarioService,
        private empleadoService: AllempleadosService,
        private actualizacionService: ActualizacionService,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.empleadoService.MostrarEmpleados().subscribe(
            response => {
                this.ArrayEmpleadoSolicitante = response.data;
                this.fecha = this.datePipe.transform(new Date(), 'dd - mm - yyyy');
            },
            error => {
                console.error(error)
            }
        )

        this.actualizacionService.MostrarTipo().subscribe(
            response =>{
                this.ArrayTipo = response.data
                console.log(response)
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

    FiltrandoSelect(): void{
        this.ArrayEmpleadoReemplazante = this.ArrayEmpleadoSolicitante.filter( empleado => empleado.rut != this.actualizacion.rut )
    }
    
    EnviarActualizacion(): void{
        this.actualizacion.planificacion_id = this.planificacion_id;
        this.actualizacionService.RegistrarActualizacion(this.actualizacion).subscribe(
            response =>{

            }, 
            error =>{

            }
        )
        
    }

    Cerrar(): void {
        this.horarioService.modalAddActualizacion = !this.horarioService.modalAddActualizacion
    }

}
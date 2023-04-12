import { Component, OnInit, Type, Input, EventEmitter, Output } from '@angular/core';
import { Empleado } from '../empleados';
import { AllempleadosService } from '../services/allempleados.service';
import { HorarioService } from '../services/horario.service';
import { DatePipe } from '@angular/common';


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

    public ArrayEmpleados: Empleado[];
    public asd: any;
    public fecha: any;

    constructor(
        private horarioService: HorarioService,
        private empleadoService: AllempleadosService,
        private datePipe: DatePipe
    ) {}
    
    Cerrar(): void{
        this.horarioService.modalAddActualizacion = !this.horarioService.modalAddActualizacion
    }

    ngOnInit(): void {
        this.empleadoService.MostrarEmpleados().subscribe(
            response => {
                this.ArrayEmpleados = response.data;
                this.fecha = this.datePipe.transform(new Date(), 'dd - mm - yyyy');
            },
            error => {
                console.error(error)
            }
        )
    }

    enviarActualizacion(): void{

    }
}
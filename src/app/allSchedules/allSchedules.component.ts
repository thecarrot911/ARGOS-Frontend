import { Component, OnInit } from '@angular/core';
import { AllSchedulesService } from '../services/allSchedules.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { PlanificacionAnual } from '../calendarioanual';
import { Planificacion } from '../UltimaPlanificacion';

@Component({
  selector: 'app-allSchedules',
  templateUrl: './allSchedules.component.html',
  styleUrls: ['./allSchedules.component.css']
})
export class AllSchedulesComponent implements OnInit {

    searchString : any;

    CurrentDate = new Date();
    latest_date = this.datePipe.transform(this.CurrentDate, 'yyyy-MM-dd');
    today_is = this.datePipe.transform(this.CurrentDate, 'EEEE, MMMM d, y')

    public planificaciones: PlanificacionAnual
    public planificacioActual: Planificacion
    public anio: number;
    
    public CantidadPorPagina: number = 7;
    public PaginaPlanificacion: number = 1;
    public PaginacionPlanificacion: number = 1;
    public ContadorCalendario: number = 0;


    constructor(
        private allSchedulesService: AllSchedulesService,
        private datePipe: DatePipe,
    ) { }

    ngOnInit() {
        this.allSchedulesService.MostrarPlanificacionAnual(this.CurrentDate.getFullYear()).subscribe(
            response => {
                console.log(response)
                this.planificaciones = response;
                this.planificacioActual = this.planificaciones.data[0];
                this.planificacioActual.mostrar = true;
            },
            error => {
                console.log(error)
            }
        )
    }

    SeleccionMes(planificacionSeleccionada: Planificacion){

        this.planificaciones.data.forEach(planificacion =>{
            if(planificacion.mes === planificacionSeleccionada.mes){
                planificacion.mostrar = true;
                this.planificacioActual = planificacion
                this.PaginacionPlanificacion = 1;
            }else{
                planificacion.mostrar = false;
            }
        })
    }

    buscarCalendarios(){
        this.allSchedulesService.MostrarPlanificacionAnual(this.anio).subscribe(
            response => {
                console.log(response)
                this.planificaciones = response
            },
            error => {
                console.log(error)
            }
        )
    }

    onPaginationCalendario(event: any) {
        this.PaginaPlanificacion = event;
        this.buscarCalendarios();
    }

    onDisenoTabla(event: any): void {
        this.CantidadPorPagina = event.target.value;
        this.PaginaPlanificacion = 1;
        this.buscarCalendarios();
    }

    alertaComodin(comodin: string) {
        Swal.fire({
        title: 'Comodín',
        text: 'Se necesita comodín, turno: ' + comodin,
        imageUrl: 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/49908/joker-emoji-clipart-xl.png',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        })
    }
    }
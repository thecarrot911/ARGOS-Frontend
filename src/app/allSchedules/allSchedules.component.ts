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

    CurrentDate = new Date();
    latest_date = this.datePipe.transform(this.CurrentDate, 'yyyy-MM-dd');
    today_is = this.datePipe.transform(this.CurrentDate, 'EEEE, MMMM d, y')

    public planificaciones: PlanificacionAnual
    public planificacionActual: Planificacion

    public CantidadPorPagina: number = 7;
    public PaginaPlanificacion: number = 1;
    public PaginacionPlanificacion: number = 1;
    public ContadorCalendario: number = 0;

    public anio: number = null;

    constructor(
        private allSchedulesService: AllSchedulesService,
        private datePipe: DatePipe,
    ) {
    }

    ngOnInit() {
        //this.allSchedulesService.MostrarPlanificacionAnual(this.CurrentDate.getFullYear()).subscribe(
        this.allSchedulesService.MostrarPlanificacionAnual(2004).subscribe(
            response => {
                if (response.error){

                    this.planificaciones = response;
                    this.planificacionActual = this.planificaciones.data[0];
                    this.planificacionActual.mostrar = true;
                
                }else{

                    console.log("xD?")
                    this.planificaciones = null;
                    this.planificacionActual = null;

                }
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
                this.planificacionActual = planificacion
                this.PaginacionPlanificacion = 1;
            }else{
                planificacion.mostrar = false;
            }
        })
    }

    buscarCalendarios(){
        const anioBuscado = this.anio;
        console.log(anioBuscado)
        this.allSchedulesService.MostrarPlanificacionAnual(anioBuscado).subscribe(
            response => {
                this.planificaciones = response
                this.planificacionActual = this.planificaciones.data[0]
                this.planificacionActual.mostrar = true;
            },
            error => {
                console.log(error)
            }
        )
    }

    /*this.allSchedulesService.MostrarPlanificacionAnual(this.anio).subscribe(
        response => {
            this.planificaciones = response
            this.planificacionActual = this.planificaciones.data[0]
            this.planificacionActual.mostrar = true;
        },
        error => {
            console.log(error)
        }
    )*/

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
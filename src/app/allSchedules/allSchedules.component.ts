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

    pageCalendario: number = 1;
    paginationCalendario = 1;
    countCalendario: number = 0;
    tableSizeCalendario: number = 7;
    tableSizesCalendario: any = [5, 10, 15, 20]

    CurrentDate = new Date();
    latest_date = this.datePipe.transform(this.CurrentDate, 'yyyy-MM-dd');
    today_is = this.datePipe.transform(this.CurrentDate, 'EEEE, MMMM d, y')

    public planificaciones: PlanificacionAnual
    public planificacioActual: Planificacion
    public anio: number;

    public asd:string;

    constructor(
        private allSchedulesService: AllSchedulesService,
        private datePipe: DatePipe,
    ) { }

    ngOnInit() {
        this.allSchedulesService.MostrarPlanificacionAnual(this.CurrentDate.getFullYear()).subscribe(
            response => {
                console.log(response)
                this.planificaciones = response
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
        this.pageCalendario = event;
        this.buscarCalendarios();
    }

    onDisenoTabla(event: any): void {
        this.tableSizeCalendario = event.target.value;
        this.pageCalendario = 1;
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
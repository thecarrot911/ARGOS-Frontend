import { Component, OnInit } from '@angular/core';
import { CalendarioAnual, Data } from '../calendario';
import { Anios, PlanificacionAnios } from '../calendarioanual';
import { AllSchedulesService } from '../services/allSchedules.service';
import { Planificacion } from '../UltimaPlanificacion';
import { finalize } from 'rxjs/operators';


@Component({
    selector: 'app-allSchedules',
    templateUrl: './allSchedules.component.html',
    styleUrls: ['./allSchedules.component.css']
})
export class AllSchedulesComponent implements OnInit {


    // Variables a pedir
    planificacionAnios: PlanificacionAnios;
    planificacionAnual: CalendarioAnual;
    
    // Selección 
    planificacionActual: Planificacion = null;
    anioActual: Anios[];

    // Paginación
    CantidadPorPagina: number = 7;
    PaginacionPlanificacion: number = 1;
    ContadorCalendario:number = 0;

    public existePlanificacion: boolean = false;
    public hayPlanificacion: boolean = false;

    public efectoCarga: boolean = false;

    
    hoyEnChile = new Date().toLocaleDateString('es-cl');


    constructor(
        private AllSchedulesService: AllSchedulesService
    ){
    }

    ngOnInit(){
        this.AllSchedulesService.MostrarAniosPlanificaciones()
        .subscribe(
            response =>{
                this.planificacionAnios = response;
                if (this.planificacionAnios.data.length > 0){
                    this.existePlanificacion = true;
                    this.SeleccionPlanificacion(this.planificacionAnios.data[0].year)
                }
            }, error=>{
                console.error(error)
            }
        )
    }

    SeleccionPlanificacion(anio: number): void{
        this.efectoCarga = true;
        
        this.planificacionAnios.data.forEach( planificacion => {
            if(planificacion.year === anio){
                planificacion.mostrar = true;
            }else{
                planificacion.mostrar = false;
            }
        })

        this.AllSchedulesService.MostrarPlanificacionAnual(anio)
        .pipe(
            finalize(() => {
                this.efectoCarga = false;
            })
        ).subscribe(
            response => {
                this.planificacionAnual = response
                if (this.planificacionAnual.data.length > 0){
                    this.hayPlanificacion = true;
                    this.SeleccionMes(this.planificacionAnual.data[0].planificacion_id)
                }
            }, error => {
                console.error(error)
            }
        );

    }

    SeleccionMes(id: number):void{
        this.planificacionAnual.data.forEach( planificacion => {
            if(planificacion.planificacion_id === id){
                this.planificacionActual = planificacion
                this.planificacionActual.mostrar = true;
                this.PaginacionPlanificacion = 0

            }else{
                planificacion.mostrar = false;
            }
        });
    }
}
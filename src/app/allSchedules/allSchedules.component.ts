import { Component, OnInit } from '@angular/core';
import { AllSchedulesService } from '../services/allSchedules.service';
import { PlanificacionMensual, Informacion } from '../calendarioanual';

@Component({
  selector: 'app-allSchedules',
  templateUrl: './allSchedules.component.html',
  styleUrls: ['./allSchedules.component.css']
})
export class AllSchedulesComponent implements OnInit {

    
    listaPlanificacionMensusual: PlanificacionMensual[];
    planificacionAnualActual: PlanificacionMensual = null;

    constructor(
        private AllSchedulesService: AllSchedulesService
    ) {
    }

    ngOnInit(){
        this.AllSchedulesService.MostrarPlanificacionesAnuales().subscribe(
            response =>{
                this.listaPlanificacionMensusual = response.data;
            }, error=>{
                console.error(error)
            }
        )
    }

    SeleccionPlanificacion(planificacion: PlanificacionMensual): void{
        this.planificacionAnualActual = planificacion
    }
}
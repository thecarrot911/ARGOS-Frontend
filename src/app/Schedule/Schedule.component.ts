import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Tiempo } from '../itinerario-aviones/itinerario-aviones.component';
import { Observable } from 'rxjs';
import { calendarData } from '../calendarData'; /* Interfaz */
import { ItinerarioAvionesComponent } from '../itinerario-aviones/itinerario-aviones.component';
import { Calendario } from '../calendario';


@Component({
  selector: 'app-Schedule',
  templateUrl: './Schedule.component.html',
  styleUrls: ['./Schedule.component.css']
})
export class ScheduleComponent implements OnInit {


  public planificacion_id!: number;
  pruebas: any;
  horarios!: Calendario;
  tiempos: Tiempo[] = [];
  public generador: any; /* ONSUBMIT */

  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [5, 10, 15, 20]

  constructor(
    private horarioService: HorarioService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {  
       }

  ngOnInit(): void {
    this.cargarData();
  }

  cargarData(): void {
    this.horarioService.getHorarios()
    .subscribe(
      response =>{
        this.horarios = response;
        this.planificacion_id = this.horarios.data.planificacion_id
        console.log(this.horarios)
      },
      error =>{
        console.log("error:C")
      }
    )
  }  

  onPagination(event: any){
    this.page = event;
    this.cargarData();
  }

  onDiseñoTabla(event: any): void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.cargarData();
  }

}



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


  pruebas: any;
  horarios!: Calendario;

  tiempos: Tiempo[] = [];


  public generador: any; /* ONSUBMIT */

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
        console.log(this.horarios)
      },
      error =>{
        console.log("error:C")
      }
    )
 
/*   console.log(this.calendario) */
}



}



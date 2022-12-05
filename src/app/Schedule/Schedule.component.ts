import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Tiempo } from '../itinerario-aviones/itinerario-aviones.component';
import { Observable } from 'rxjs';
import { calendarData } from '../calendarData'; /* Interfaz */
import { ItinerarioAvionesComponent } from '../itinerario-aviones/itinerario-aviones.component';


@Component({
  selector: 'app-Schedule',
  templateUrl: './Schedule.component.html',
  styleUrls: ['./Schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  estado = new Promise((resolve, reject) => {
    setTimeout(() =>{
      resolve(this.calendario);
    }, 5000);
  })

  pruebas: any;
  public horarios: any = [];
  capturarHorario: any;
  tiempos: Tiempo[] = [];


  public generador: any; /* ONSUBMIT */

  constructor(
    private horarioService: HorarioService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { 
   }

   public calendario: any;

  ngOnInit(): void {

    this.cargarData();
    /* this.horarios = this.horarioService.getHorarios(); */

/*     this.horarios = this.horarioService.getHorarios()
    .subscribe(
      response =>{
        this.horarios = response.data
        this.calendario = response
        console.log(this.horarios)
      }
    ) */

  }
  public cargarData(){
    this.horarioService.getHorarios()
    .subscribe(
      response =>{
        this.horarios = response.data
        console.log(this.horarios)
      }
    )
/*   console.log(this.calendario) */
}



}



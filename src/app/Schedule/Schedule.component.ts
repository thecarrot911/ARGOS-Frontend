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

  public ayuda: any;

  horarios: any;
  indice: any;
  items: any;
  checkoutForm: any; /* Almacenar el modelo del formulario */

  public generador: any; /* ONSUBMIT */

  constructor(
    private horarioService: HorarioService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { 

   }

  ngOnInit(): void {
     this.horarios = this.horarioService.getHorarios(); 

/*     this.horarios = this.horarioService.getHorarios().
      subscribe(
        response => {
          console.log('xddddd')
        },
        error =>{
          console.log('OH NO ITS BROKEN');
        }
      ) */

/*     this.horarioService.getScheduleWorkers().subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error);
      }
    ); */
  }

  



/*   onSubmit(calendarData: any){
  this.items = this.horarioService.clearData();
  this.checkoutForm.reset();
  console.warn('Datos', calendarData);

  this.http.post('http://localhost:10975/app/planificacion/generar_planificacion', calendarData)
  .subscribe((res) => {
    console.log(res);
  });
  } */

/*   onSubmit(calendardata: calendarData): void {
    calendardata = calendardata.trim();
    if (!calendardata) { return; }
      this.horarioService.addSchedule(calendardata)
      .subscribe(calendardata => {
        this.calendardatas.push(calendardata);
      }); 
  } */

/*  onSubmit(){
   this.horarioService.addSchedule(this.generador)
     .subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error)
      }
     )
  } */

}



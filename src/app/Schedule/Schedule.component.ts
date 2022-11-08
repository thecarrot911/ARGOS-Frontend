import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { calendarData } from '../calendarData'; /* Interfaz */



@Component({
  selector: 'app-Schedule',
  templateUrl: './Schedule.component.html',
  styleUrls: ['./Schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  scheduleWorkers: any;
  indice: any;
  items: any;
  checkoutForm: any; /* Almacenar el modelo del formulario */

  public generador: any; /* ONSUBMIT */

  constructor(
    private horarioService: HorarioService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { 

    this.checkoutForm = this.formBuilder.group({
      anio: '',
      mes: '',
    });

    this.generador={anio:'', mes:'', empleados:''};
 
   }

  ngOnInit(): void {
    this.items = this.horarioService.getItems();
    this.horarioService.getScheduleWorkers().subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error);
      }
    );
  }

/*   onSubmit(calendarData: any){
    this.items = this.horarioService.clearData();
    this.checkoutForm.reset();
    console.warn('Datos enviados', calendarData);
  } 
 */

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

  onSubmit(){
   this.horarioService.addSchedule(this.generador)
     .subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error)
      }
     )
  }

}

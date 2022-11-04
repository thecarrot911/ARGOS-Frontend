import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private horarioService: HorarioService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { 

    this.checkoutForm = this.formBuilder.group({
      anio: '',
      mes: '',
    });
 
   }

  ngOnInit() {
    this.items = this.horarioService.getItems();
    this.scheduleWorkers = this.horarioService.getScheduleWorkers();
  }

/*   onSubmit(calendarData: any){
    this.items = this.horarioService.clearData();
    this.checkoutForm.reset();
    console.warn('Datos enviados', calendarData);
  } 
 */

  onSubmit(calendarData: any){
  this.items = this.horarioService.clearData();
  this.checkoutForm.reset();
  console.warn('Dtos porfin', calendarData);
  this.http.post('http://localhost:10975/app/planificacion/generar_planificacion', calendarData)
  .subscribe((res) => {
    console.log(res);
  });
  }
}

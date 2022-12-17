import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Tiempo } from '../itinerario-aviones/itinerario-aviones.component';
import { Observable } from 'rxjs';
import { calendarData } from '../calendarData'; /* Interfaz */
import { ItinerarioAvionesComponent } from '../itinerario-aviones/itinerario-aviones.component';
import { Calendario, Actualizacion ,Itinerario } from '../calendario';
import { ChangeDetectionStrategy } from '@angular/core';

import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import Swal from 'sweetalert2';
import { createPopper } from '@popperjs/core';


@Component({
  selector: 'app-Schedule',
  templateUrl: './Schedule.component.html',
  styleUrls: ['./Schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  dropdownPopoverShow = false;
  

  actualizaciones: Calendario[] = [];

  public planificacion_id!: number;
  public array_vacio: Array<Itinerario> = [];
  pruebas: any;
  horarios!: Calendario;
  tiempos: Tiempo[] = [];
  public generador: any; /* ONSUBMIT */

  page: number = 1;
  pageCalendario: number = 1;
  paginationCalendario = 1;
  paginationActualizaciones = 1;
  count: number = 0;
  countCalendario: number = 0;
  tableSize: number = 4;
  tableSizeCalendario: number = 7;
  tableSizes: any = [5, 10, 15, 20]
  tableSizesCalendario: any = [5, 10, 15, 20]

  CurrentDate = new Date();
  latest_date = this.datePipe.transform(this.CurrentDate, 'yyyy-MM-dd');
  today_is = this.datePipe.transform(this.CurrentDate, 'EEEE, MMMM d, y' )


  constructor(
    private horarioService: HorarioService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private datePipe: DatePipe
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
        console.log(error)
      }
    )
  }  


  onPagination(event: any){
    this.page = event;
    this.cargarData();
  }

  onPaginationCalendario(event: any){
    this.pageCalendario = event;
    this.cargarData();
  }

  onDisenoTabla(event: any): void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.cargarData();
  }

  onDisenoTabla2(event: any): void{
    this.tableSizeCalendario = event.target.value;
    this.pageCalendario = 1;
    this.cargarData();
  }

  deleteActualizacion(actualizacion: Actualizacion): void{
    this.horarioService.deleteActualizacionId(actualizacion)
    .subscribe(response => {
      console.log('deleteanding')
      this.ngOnInit();
    },
    error=>{
      console.log(error)
    }  );
  }

  alertaItinerario(itinerario: Itinerario){
    /* console.log(this.horarios.data.planificacion) */
    /* Itinerario falta = this.horarios.data.planificacion[0].itinerario[0].turno_itinerario */
    

    
    Swal.fire({
    title: 'Alerta de encuentros de aviones',
    html: 'Empleados faltantes: ' +  + itinerario.falta + '<br>' + 'Turno del encuentro: ' + itinerario.turno_itinerario,
    icon: 'warning',})
  }


}
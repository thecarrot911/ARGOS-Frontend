import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Tiempo } from '../itinerario-aviones/itinerario-aviones.component';
import { Calendario, Actualizacion, Itinerario, Planificacion, Data } from '../calendario';
import { ChangeDetectionStrategy } from '@angular/core';

import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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

  horarios: Calendario;
  horariosData: Data;
  horariosPlanificacion: Planificacion[] = [];
  horariosActualizacion: Actualizacion[] = [];


  public prueba1: number;

  tiempos: Tiempo[] = [];
  public generador: any; /* ONSUBMIT */
  public global: any;

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
  today_is = this.datePipe.transform(this.CurrentDate, 'EEEE, MMMM d, y');
  
  today_is_chile = this.CurrentDate.toLocaleDateString('es-cl');


  constructor(
    private horarioService: HorarioService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.cargarData();
  }

  cargarData(): void {
    this.horarioService.getHorarios()
      .subscribe(
        response => {
          this.horarios = response;
          this.horariosData = this.horarios.data
          this.horariosPlanificacion = this.horariosData.planificacion;
          this.horariosActualizacion = this.horariosData.actualizacion;

          this.global = this.horarios;
          this.planificacion_id = this.horarios.data.planificacion_id;     
        },
        error => {
          console.log(error)
        }
      )
  }


  onPagination(event: any) {
    this.page = event;
    this.cargarData();
  }

  onPaginationCalendario(event: any) {
    this.pageCalendario = event;
    this.cargarData();
  }

  onDisenoTabla(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.cargarData();
  }

  onDisenoTabla2(event: any): void {
    this.tableSizeCalendario = event.target.value;
    this.pageCalendario = 1;
    this.cargarData();
  }

  deleteActualizacion(actualizacion_id: Actualizacion): void {
    this.horarioService.deleteActualizacionId(actualizacion_id)
      .subscribe(response => {
        this.ngOnInit();
      },
        error => {
          console.log(error)
        });
  }

  deleteScheduleById(planificacion: Data): void{ 
    this.horarioService.deletePlanificacionId(planificacion)
    .subscribe(response => {
      this.ngOnInit();
    },
    error =>{
      console.log(error)
    })
  }

  alertaItinerario(itinerario: Itinerario) {
    Swal.fire({
      title: 'Alerta encuentros de aviones',
      html: 'Empleados faltantes: ' + + itinerario.falta + '<br>' + 'Turno del encuentro: ' + itinerario.turno_itinerario,
      icon: 'warning',
    })
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
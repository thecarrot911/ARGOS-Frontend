import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Tiempo } from '../itinerario-aviones/itinerario-aviones.component';
import { Observable } from 'rxjs';
import { calendarData } from '../calendarData'; /* Interfaz */
import { ItinerarioAvionesComponent } from '../itinerario-aviones/itinerario-aviones.component';
import { Calendario, Actualizacion, Itinerario, Planificacion } from '../calendario';
import { ChangeDetectionStrategy } from '@angular/core';

import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import Swal from 'sweetalert2';
import { createPopper } from '@popperjs/core';
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
  horarios!: Calendario;
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
  today_is = this.datePipe.transform(this.CurrentDate, 'EEEE, MMMM d, y')


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
          this.global = this.horarios
          this.planificacion_id = this.horarios.data.planificacion_id
          console.log(this.horarios)
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
        console.log('deleteanding')
        this.ngOnInit();
      },
        error => {
          console.log(error)
        });
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
  GeneradorTablas(planificacion:Planificacion[], number:any):Planificacion[]{
    let body = new Array();
    let tableHeader = new Array();
    let tableHeaderDia = { text: 'Día', style: 'tableHeader' };
    let tableHeaderFecha = { text: 'Fecha', style: 'tableHeader' };
    tableHeader.push(tableHeaderDia);
    tableHeader.push(tableHeaderFecha);
    for (let i = 0; i < planificacion[0].empleados.length; i++) {
      tableHeader.push({ text: planificacion[0].empleados[i].nombre, style: 'tableHeader' })
    }
    body.push(tableHeader);
    console.log(planificacion[number])
    for(let j = number;j<(number+7);j++){
      console.log(planificacion[number].dia_semana)
      body.push(
        [
          planificacion[j].dia_semana,
          planificacion[j].numero_dia,
          planificacion[j].empleados[0].turno,
          planificacion[j].empleados[1].turno,
          planificacion[j].empleados[2].turno,
          planificacion[j].empleados[3].turno,
          planificacion[j].empleados[4].turno
        ]
      )
    }
    return body;
  }

  GeneradorContenidoPDF(planificacion: Planificacion[]): any[] {
    let content = new Array();
    let indiceSemana = 1
    for(let k=0;k<planificacion.length;k=k+7){
      if(k==0){
        content.push(['Semana '+(indiceSemana)+' :'+'\n',{style: 'tableExample',table: {body: this.GeneradorTablas(planificacion,k)}}])
      }
      else{
        content.push(['\n'+'Semana '+(indiceSemana)+' :'+'\n',{style: 'tableExample',table: {body: this.GeneradorTablas(planificacion,k)}}])
      }
      indiceSemana = indiceSemana + 1;
    }
    return content;
  }

  crearPdf() {
    let planificacion = this.horarios.data.planificacion;
    let bodyPlanificacion = this.GeneradorContenidoPDF(planificacion);

    const pdfDefinition: any = {
      content: bodyPlanificacion
      /*['\n Semana 1: '+'\n',{style: 'tableExample',table: {body: bodyPlanificacion}},
        '\n Semana 2: '+'\n',{style: 'tableExample',table: {body: bodyPlanificacion2}}]*/
      /*content: [
        {
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          },
          table: {
            headerRows: 1,
            body: bodyPlanificacion

          },
        }
      ]*/
    }

    pdfMake.createPdf(pdfDefinition).open();

  }


}
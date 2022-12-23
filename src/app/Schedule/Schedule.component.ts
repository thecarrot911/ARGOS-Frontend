import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Tiempo } from '../itinerario-aviones/itinerario-aviones.component';
import { Observable } from 'rxjs';
import { calendarData } from '../calendarData'; /* Interfaz */
import { ItinerarioAvionesComponent } from '../itinerario-aviones/itinerario-aviones.component';
import { Calendario, Actualizacion, Itinerario, Planificacion, Data } from '../calendario';
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
  GeneradorTablasPlanificacion(planificacion: Planificacion[], number: any): Planificacion[] {
    let body = new Array();
   
    let tableHeader = new Array();
    let tableHeaderDia = {
                          text: 'Día',
                          style: 'tableHeader',
                          color: 'black',
                          fillColor: '#dddddd'
                          };
    let tableHeaderFecha = {
                            text: 'Fecha',
                            style: 'tableHeader',
                            color: 'black',
                            fillColor: '#dddddd'
                          };
    tableHeader.push(tableHeaderDia);
    tableHeader.push(tableHeaderFecha);
    for (let i = 0; i < planificacion[0].empleados.length; i++) {
      tableHeader.push
      ({
        text: planificacion[0].empleados[i].nombre,
        style: 'tableHeader',
        fillColor: '#dddddd',
        fontSize: 10
      })
    }
    body.push(tableHeader);
    
    let diaSemana;
    if(number + 7 <= planificacion.length){
      diaSemana = 7
    }
    else{
      diaSemana = (planificacion.length - number)
    }
    for (let j = number; j < (number + diaSemana); j++) {
      let array = []
      array.push({
        text: planificacion[j].dia_semana,
        fillColor: '#CECCE8',
        fontSize: 10
      })
      array.push({
        text: planificacion[j].numero_dia,
        fillColor: '#CECCE8',
        fontSize: 10
      })
      for(let k = 0;k<planificacion[j].empleados.length;k++){
        if(planificacion[j].comodin != 'Libre' && planificacion[j].empleados[k].turno == 'Libre'){
          array.push({
            text: planificacion[j].comodin+' COMODIN',
            fillColor: '#F7E4DF',
            fontSize: 10,
            decoration: 'underline'
          })
        }else{
          array.push({
            text: planificacion[j].empleados[k].turno,
            fillColor: '#EBF2FA',
            fontSize: 10,
            characterSpacing: '1',
            widths: ['20', '20', '20', '20', '30']
          })
        }
      }
      body.push(array)
    }
    return body;
  }
  
  GeneradorTablaActualizaciones(actualizacion: Actualizacion[]): any[] {
    let body = new Array();

    let tableHeader = new Array();

    let tableHeaderDia = {
      text: 'Tipo de Permiso', style: 'tableHeader'
    };
    let tableHeaderEmpleado = {
      text: 'Empleado', style: 'tableHeader'
    };
    let tableHeaderDescripcion = {
      text: 'Descripción', style: 'tableHeader'
    };
    let tableHeaderFecha = {
      text: 'Fecha', style: 'tableHeader'
  };

    tableHeader.push({
      text: tableHeaderDia,
      fillColor: '#dddddd'
    });
    tableHeader.push({
      text: tableHeaderEmpleado,
      fillColor: '#dddddd'
    });
    tableHeader.push({
      text: tableHeaderDescripcion,
      fillColor: '#dddddd'
    });
    tableHeader.push({
      text: tableHeaderFecha,
      fillColor: '#dddddd'
    });

    body.push(tableHeader);
    for (let i = 0; i < actualizacion.length; i++) {
      body.push([
        actualizacion[i].tipo_permiso,
        actualizacion[i].empleado,
        actualizacion[i].descripcion
        //actualizacion[i].fecha.format("MM-DD-YYYY")
      ])
    }


    return body;
  }

  GeneradorContenidoPDF(data: Data): any[] {
    let planificacion = data.planificacion
    let actualizacion = data.actualizacion

    let content = new Array();

    let tituloEmpresa = {text: 'Ariaca',style: 'header' }
    content.push(tituloEmpresa);

    let tituloPlanificacion = {text: 'Planificación de '+this.horarios.data.mes+' del '+this.horarios.data.anio ,style: 'header'}
    content.push(tituloPlanificacion);

    let indiceSemana = 1
    for (let k = 0; k < planificacion.length; k = k + 7) {
      if (k == 0) {
        content.push(
        ['Semana ' + (indiceSemana) + '\n',
          { style: '',
          table:
            { 
              body: this.GeneradorTablasPlanificacion(planificacion, k),
            }
          }
        ])
      }
      else {
        content.push(['\n' + 'Semana ' + (indiceSemana) + '\n', { style: 'tableExample', table: { body: this.GeneradorTablasPlanificacion(planificacion, k)  } }])
      }
      indiceSemana = indiceSemana + 1;
    }
    if(actualizacion.length>0){
      content.push(['\n\n\n' + 'Actualizaciones',
      { style: 'tableExample',
      table: { body: this.GeneradorTablaActualizaciones(actualizacion), headerRows: 1,
        widths: [ '*', 'auto', 100, '*' ],} }])
    }
    return content;
  }


  crearPdf() {
    let data = this.horarios.data;
    let bodyPlanificacion = this.GeneradorContenidoPDF(data);

    const pdfDefinition: any = {
      content: bodyPlanificacion
    }

    pdfMake.createPdf(pdfDefinition).open();

  }


}
import { Component, OnInit } from '@angular/core';
import { Calendario, Actualizacion, Itinerario, Planificacion, Data } from '../calendario';
import { HorarioService } from '../services/horario.service';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf-calendario',
  templateUrl: './pdf-calendario.component.html',
  styleUrls: ['./pdf-calendario.component.css']
})
export class PdfCalendarioComponent implements OnInit {

  horarios: Calendario;
  global: any;
  planificacion_id: number;

  constructor(
    private horarioService: HorarioService
  ) { }

  ngOnInit() {
    this.horarioService.getHorarios()
      .subscribe(
        response => {
          //this.horarios = response;
          //this.global = this.horarios
          //this.planificacion_id = this.horarios.data.planificacion_id
          console.log(this.horarios)
        },
        error => {
          console.log(error)
        }
      )
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
        fontSize: 10,
        italics: true
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
        fontSize: 10,
        italics: true
      })
      array.push({
        text: planificacion[j].numero_dia,
        fillColor: '#CECCE8',
        fontSize: 10,
        italics: true
      })
      for(let k = 0;k<planificacion[j].empleados.length;k++){
        if(planificacion[j].comodin != 'Libre' && planificacion[j].empleados[k].turno == 'Libre'){
          array.push({
            text: planificacion[j].comodin+' COMODIN',
            fillColor: '#F7E4DF',
            fontSize: 10,
            decoration: 'underline',
            italics: true
          })
        }else{
          array.push({
            text: planificacion[j].empleados[k].turno,
            fillColor: '#EBF2FA',
            fontSize: 10,
            characterSpacing: '0',
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
    console.log(body)
    for (let i = 0; i < actualizacion.length; i++) {
      body.push([
        actualizacion[i].tipo_permiso,
        actualizacion[i].empleado,
        actualizacion[i].descripcion,
        actualizacion[i].fecha
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

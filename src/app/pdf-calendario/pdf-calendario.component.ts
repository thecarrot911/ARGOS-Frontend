import { Component, Input, OnInit } from '@angular/core';
import { Calendario, Actualizacion, Itinerario, Data, Empleados } from '../calendario';
import { HorarioService } from '../services/horario.service';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Dia, Planificacion } from '../UltimaPlanificacion';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-pdf-calendario',
    templateUrl: './pdf-calendario.component.html',
    styleUrls: ['./pdf-calendario.component.css']
})
export class PdfCalendarioComponent implements OnInit {

    @Input() planificacion: Planificacion
    
    horarios: Calendario;
    global: any;
    planificacion_id: number;

    constructor(
        private horarioService: HorarioService
    ) { }

    ngOnInit() {
    }

    GeneradorTablasPlanificacion(planificacion: any, number: any): any[] {
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
        if (number + 7 <= planificacion.length) {
            diaSemana = 7
        }
        else {
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
            for (let k = 0; k < planificacion[j].empleados.length; k++) {
                if (planificacion[j].comodin != 'Libre' && planificacion[j].empleados[k].turno == 'Libre') {
                    array.push({
                        text: planificacion[j].comodin + ' COMODIN',
                        fillColor: '#F7E4DF',
                        fontSize: 10,
                        decoration: 'underline',
                        italics: true
                    })
                } else {
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

        let tituloEmpresa = { text: 'Ariaca', style: 'header' }
        content.push(tituloEmpresa);

        let tituloPlanificacion = { text: 'Planificación de ' + this.horarios.data.mes + ' del ' + this.horarios.data.anio, style: 'header' }
        content.push(tituloPlanificacion);

        let indiceSemana = 1
        for (let k = 0; k < planificacion.length; k = k + 7) {
            if (k == 0) {
                content.push(
                    ['Semana ' + (indiceSemana) + '\n',
                    {
                        style: '',
                        table:
                        {
                        
                            //body: this.GeneradorTablasPlanificacion(planificacion, k),
                        }
                    }
                    ])
            }
            else {
                //content.push(['\n' + 'Semana ' + (indiceSemana) + '\n', { style: 'tableExample', table: { body: this.GeneradorTablasPlanificacion(planificacion, k)  } }])
            }
            indiceSemana = indiceSemana + 1;
        }
        if (actualizacion.length > 0) {
            content.push(['\n\n\n' + 'Actualizaciones',
            {
                style: 'tableExample',
                table: {
                    body: this.GeneradorTablaActualizaciones(actualizacion), headerRows: 1,
                    widths: ['*', 'auto', 100, '*'],
                }
            }])
        }
        return content;
    }

    ContenidoPDF(planificacion: Planificacion){
        let contenido = []

        const titulo = { text: 'Ariaca', style: 'header', alignment:'right'};
        const tituloPlanificacion = { text: `Planificación de ${planificacion.mes} del ${planificacion.anio}`, 
        style: 'header', decoration: 'underline', alignment: 'center'};
        
        contenido.push(titulo);
        contenido.push(tituloPlanificacion)
        contenido.push({ text: '', margin: [0, 20, 0, 0] });


        let semana = [];

        for(const dia of planificacion.planificacion){
            if(dia.dia_semana == 'Lunes' && semana.length != 0){
                contenido.push({
                    table:{
                        widths:'*',
                        layout: 'fullWidth',
                        body: this.GenerarTablaDeLaSemana(semana),
                    }
                })
                contenido.push({ text: '', margin: [0, 20, 0, 0] });

                semana = []
                semana.push(dia)
            }else semana.push(dia)
        }
        if(semana.length != 0){
            contenido.push({
                table:{
                    widths:'*',
                    layout: 'fullWidth',
                    body: this.GenerarTablaDeLaSemana(semana),
                }
            });
            contenido.push({ text: '', margin: [0, 20, 0, 0] });

        }
        return contenido
    }

    GenerarTablaDeLaSemana(semana: Dia[]){
        let body = [];

        let fila = []

        fila.push({ text: `Nombre`, alignment: 'center', fontSize: 10});
        for (const empleado of semana[semana.length-1].empleados) {
            fila.push({ text: `${empleado.nombre} ${empleado.apellido}`, alignment: 'center', fontSize: 10,});
        }
        body.push(fila)

        for(const dia of semana){
            fila = []
            fila.push({ text: `${dia.dia_semana} ${dia.dia_numero}`, alignment: 'center', fontSize: 10,})
            for (const columna of semana[semana.length-1].empleados) {
                let control = true
                for (const empleado of dia.empleados) {
                    if (columna.rut == empleado.rut){
                        fila.push({ text: `${empleado.turno}`, alignment: 'center', fontSize: 10,})
                        control = false
                        break;
                    }
                }
                if(control){
                    fila.push({ text: `-`, alignment: 'center', fontSize: 10,})
                }
            }
            body.push(fila)

        }

        return body;
    };

    crearPdf() {
        const bodyPDF = this.ContenidoPDF(this.planificacion)
        const PDF = { content: bodyPDF }
        pdfMake.createPdf(PDF).open();
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { Calendario, Actualizacion, Itinerario, Data, Empleados } from '../calendario';
import { HorarioService } from '../services/horario.service';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ActualizacionPlani, Dia, Horario, Planificacion } from '../UltimaPlanificacion';
import { Informacion } from '../calendarioanual';
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
        const tituloPlanificacion = { text: `Planificación de ${planificacion.mes} del ${planificacion.anio}`, 
            style: 'header', decoration: 'underline', alignment: 'center', fontSize: 15};
        
        contenido.push(tituloPlanificacion)
        contenido.push({ text: '', margin: [0, 20, 0, 0] });

        let semana = [];

        for(const dia of planificacion.planificacion){
            if(dia.dia_semana == 'Lunes' && semana.length != 0){
                contenido.push({
                    table:{
                        widths:'*',
                        layout: 'fullWidth',
                        body: this.GenerarTablaDeLaSemana(semana,this.planificacion.horario),
                    }
                })
                contenido.push({ text: '', margin: [0, 20, 0, 0] });
                this.GenerarItinerario(semana, this.planificacion.horario, contenido)
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
                    body: this.GenerarTablaDeLaSemana(semana,this.planificacion.horario),
                }
            });
            contenido.push({ text: '', margin: [0, 20, 0, 0] });
            this.GenerarItinerario(semana, this.planificacion.horario, contenido)
            contenido.push({ text: '', margin: [0, 20, 0, 0] });

        }

        if (this.planificacion.actualizacion!=undefined){
            const tituloActualizacion = { text: 'Actualizacion', style: 'header', decoration: 'underline', alignment: 'center', fontSize: 12 }
            contenido.push(tituloActualizacion);
            contenido.push({ text: '', margin: [0, 20, 0, 0] });
            contenido.push({
                table:{
                    layout: 'fullWidth',
                    body: this.GenerarTablaDeActualizacion(this.planificacion.actualizacion)
                }
            })
            contenido.push({ text: '', margin: [0, 20, 0, 0] });
        }

        
        const tituloInformacion = { text: 'Estadistica', style: 'header', decoration: 'underline', alignment: 'center',fontSize: 12 }
        contenido.push(tituloInformacion)
        contenido.push({ text: '', margin: [0, 20, 0, 0] });

        contenido.push({
            table:{
                widths:'*',
                layout: 'fullWidth',
                body: this.GenerarTablaDeInformacion(this.planificacion.estadistica.empleados, this.planificacion.horario)
            }
        })
        return contenido
    }

    GenerarItinerario(semana: Dia[], horario: Horario, contenido: any){
        for(const dia of semana){
            if(dia.itinerario != undefined){
                for(const itinerario of dia.itinerario){
                    if(itinerario.turno == 1){
                        contenido.push({ text: `En el turno ${horario.turno1} faltan ${itinerario.falta} empleados.`, style: 'header', alignment: 'justify' })
                    }else if(itinerario.turno == 2){
                        contenido.push({ text: `En el turno ${horario.turno2} faltan ${itinerario.falta} empleados.`, style: 'header', alignment: 'justify' })
                    }else{
                        contenido.push({ text: `En el turno ${horario.turno3} faltan ${itinerario.falta} empleados.`, style: 'header', alignment: 'justify' })
                    }
                }
            }
        }
        return;
    }

    GenerarTablaDeActualizacion(actualizacion: ActualizacionPlani[]){
        let body = []
        let fila = []
        fila.push({ text: `Fecha`, alignment: 'center', fontSize: 10 });
        fila.push({ text: `Solicitante`, alignment: 'center', fontSize: 10 });
        fila.push({ text: `Tipo`, alignment: 'center', fontSize: 10 });
        fila.push({ text: `Descripción`, alignment: 'justify', fontSize: 10 });
        fila.push({ text: `Reemplazo`, alignment: 'center', fontSize: 10});
        fila.push({ text: `Fecha Inicio`, alignment: 'center', fontSize: 10 });
        fila.push({ text: `Fecha Termino`, alignment: 'center', fontSize: 10 });
        body.push(fila)

        for(const actua of actualizacion){
            let fila = []
            if(actua.tipo != 'Observación'){
                fila.push({ text: `${actua.fecha}`, alignment: 'center', fontSize: 10 })
                fila.push({ text: `${actua.solicitante_nombre} ${actua.solicitante_apellido}`, alignment: 'center', fontSize: 10  })
                fila.push({ text: `${actua.tipo}`, alignment: 'center', fontSize: 10  })
                fila.push({ text: `${actua.descripcion}`, alignment: 'justify',fontSize: 10  })
                fila.push({ text: `${actua.reemplazo_nombre} ${actua.reemplazo_apellido}`, alignment: 'center', fontSize: 10 })
                fila.push({ text: `${actua.fecha_inicio}`, alignment: 'center', fontSize: 10 })
                fila.push({ text: `${actua.fecha_termino}`, alignment: 'center', fontSize: 10 })
            }else{
                fila.push({ text: `${actua.fecha}`, alignment: 'center', fontSize: 10 })
                fila.push({ text: `${actua.solicitante_nombre} ${actua.solicitante_apellido}`, alignment: 'center', fontSize: 10  })
                fila.push({ text: `${actua.tipo}`, alignment: 'center', fontSize: 10  })
                fila.push({ text: `${actua.descripcion}`,fontSize: 10  })
                fila.push({ text: `-`, alignment: 'center', fontSize: 10 })
                fila.push({ text: `-`, alignment: 'center', fontSize: 10 })
                fila.push({ text: `-`, alignment: 'center', fontSize: 10 })
            }
            body.push(fila)
        }
        return body;
    }

    GenerarTablaDeInformacion(empleados: Informacion[], horario: Horario){
        let body = [];
        let fila = []
        fila.push({text:`Nombre`, alignment: 'center', fontSize: 10});
        fila.push({text:`${horario.turno1}`, alignment: 'center', fontSize: 10});
        fila.push({text:`${horario.turno2}`, alignment: 'center', fontSize: 10});
        fila.push({text:`${horario.turno3}`, alignment: 'center', fontSize: 10});
        fila.push({text:`Feriado`, alignment: 'center', fontSize: 10});
        fila.push({text:`Libre`, alignment: 'center', fontSize: 10});
        body.push(fila)

        for(const emp of empleados){
            fila = []
            fila.push({text:`${emp.nombre_paterno} ${emp.apellido_paterno}`, alignment: 'center', fontSize: 10});
            fila.push({text:`${emp.turno1}`, alignment: 'center', fontSize: 10})
            fila.push({text:`${emp.turno2}`, alignment: 'center', fontSize: 10})
            fila.push({text:`${emp.turno3}`, alignment: 'center', fontSize: 10})
            fila.push({text:`${emp.feriado}`, alignment: 'center', fontSize: 10})
            fila.push({text:`${emp.libre}`, alignment: 'center', fontSize: 10})
            body.push(fila)
        }
        return body
    }

    GenerarTablaDeLaSemana(semana: Dia[], horario: Horario){
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
                        //fila.push({ text: `${empleado.turno}`, alignment: 'center', fontSize: 10 })
                        if(empleado.turno == 1){
                            fila.push({ text: `${horario.turno1}`, alignment: 'center', fontSize: 10 })
                        }else if(empleado.turno == 2){
                            fila.push({ text: `${horario.turno2}`, alignment: 'center', fontSize: 10 })
                        }else if(empleado.turno == 3){
                            fila.push({ text: `${horario.turno3}`, alignment: 'center', fontSize: 10 })
                        }else if(empleado.turno == 0){
                            fila.push({ text: `Libre`, alignment: 'center', fontSize: 10 })
                        }else if(empleado.turno == 4){
                            fila.push({ text: `Permiso`, alignment: 'center', fontSize: 10 })
                        }else if(empleado.turno == 5){
                            fila.push({ text: `Vacaciones`, alignment: 'center', fontSize: 10 })
                        }else{
                            fila.push({ text: `Otro`, alignment: 'center', fontSize: 10 })
                        }


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

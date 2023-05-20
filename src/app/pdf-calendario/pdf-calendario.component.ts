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
                        contenido.push({ text: `En el ${dia.dia_semana} ${dia.dia_numero} del turno ${horario.turno1} faltan ${itinerario.falta} empleados.`, style: 'header', alignment: 'justify' })
                    }else if(itinerario.turno == 2){
                        contenido.push({ text: `En el ${dia.dia_semana} ${dia.dia_numero} del turno ${horario.turno2} faltan ${itinerario.falta} empleados.`, style: 'header', alignment: 'justify' })
                    }else{
                        contenido.push({ text: `En el ${dia.dia_semana} ${dia.dia_numero} del turno ${horario.turno3} faltan ${itinerario.falta} empleados.`, style: 'header', alignment: 'justify' })
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

import { Component, OnInit } from '@angular/core';
import { CalendarioAnual} from '../calendario';
import { Anios, PlanificacionAnios } from '../calendarioanual';
import { AllSchedulesService } from '../services/allSchedules.service';
import { Planificacion, Dia } from '../UltimaPlanificacion';
import { finalize } from 'rxjs/operators';
import { HorarioService } from '../services/horario.service';
import { ActualizacionService } from '../services/actualizacion.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-allSchedules',
    templateUrl: './allSchedules.component.html',
    styleUrls: ['./allSchedules.component.css']
})
export class AllSchedulesComponent implements OnInit {


    // Variables a pedir
    planificacionAnios: PlanificacionAnios;
    planificacionAnual: CalendarioAnual;
    
    // Selección 
    planificacionActual: Planificacion = null;
    anioActual: Anios[];

    // Paginación Planificacion
    CantidadPorPagina: number = 7;
    PaginacionPlanificacion: number = 1;
    ContadorCalendario:number = 0;

    // Paginación Actualización
    CantidadPorPaginaActualizacion: number = 3;
    PaginacionActualizacion: number = 1;
    ContadorActualizacion: number = 0;

    itinerarioActual: Dia;

    public existePlanificacion: boolean = false;
    public hayPlanificacion: boolean = false;

    public efectoCarga: boolean = false;

    
    hoyEnChile = new Date().toLocaleDateString('es-cl');


    constructor(
        private AllSchedulesService: AllSchedulesService,
        public horarioService: HorarioService,
        private actualizacionService: ActualizacionService,

        ){
    }

    BorrarPlanificacion(planificacion: Planificacion): void{
        /*
        this.AllSchedulesService.BorrarPlanificacion(planificacion)
        .pipe(
            finalize(()=>{

            })
        ).subscribe(
            response =>{
                this.ngOnInit();
            },error =>{
                console.error(error)
            }
        )
        */
    };

    EliminarActualizacion(id: number, tipo: string): void{
        Swal.fire({
            title: "¿Estás seguro?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!'
        }).then((result) =>{
            if(result.isConfirmed){
                this.actualizacionService.EliminarActualizacion(id, tipo).subscribe(
                    response => {
                        Swal.fire(
                            'Eliminado!',
                            response.msg,
                            'success'
                        )
                        this.ngOnInit();
                    }, error => {
                        console.error(error)
                    }
                )
            }
        });
    };

    ngOnInit(){
        this.AllSchedulesService.MostrarAniosPlanificaciones()
        .subscribe(
            response =>{
                this.planificacionAnios = response;
                if (this.planificacionAnios.data.length > 0){
                    this.existePlanificacion = true;
                    this.SeleccionPlanificacion(this.planificacionAnios.data[0].year)
                }
            }, error=>{
                console.error(error)
            }
        )
    }

    MostrarModalActualizacion(): void{
        this.horarioService.modalAddActualizacion = !this.horarioService.modalAddActualizacion;
    }

    SeleccionPlanificacion(anio: number): void{
        this.efectoCarga = true;
        
        this.planificacionAnios.data.forEach( planificacion => {
            if(planificacion.year === anio){
                planificacion.mostrar = true;
            }else{
                planificacion.mostrar = false;
            }
        })

        this.AllSchedulesService.MostrarPlanificacionAnual(anio)
        .pipe(
            finalize(() => {
                this.efectoCarga = false;
            })
        ).subscribe(
            response => {
                this.planificacionAnual = response
                
                if (this.planificacionAnual.data.length > 0){
                    this.hayPlanificacion = true;
                    this.SeleccionMes(this.planificacionAnual.data[0].planificacion_id)
                }
            }, error => {
                console.error(error)
            }
        );

    }

    SeleccionMes(id: number):void{
        this.planificacionAnual.data.forEach( planificacion => {
            if(planificacion.planificacion_id === id){
                this.planificacionActual = planificacion
                console.log(this.planificacionActual)
                this.planificacionActual.mostrar = true;
                this.PaginacionPlanificacion = 0

            }else{
                planificacion.mostrar = false;
            }
        });
    }

    MostrarItinerario(itinerario: Dia):void{
        this.horarioService.modalItinerarioPlanificacion = !this.horarioService.modalItinerarioPlanificacion;
        this.itinerarioActual = itinerario;
    }
}
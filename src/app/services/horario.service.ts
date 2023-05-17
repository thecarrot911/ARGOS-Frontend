import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; /* a */
import { Observable, pipe, of, throwError } from 'rxjs'; /* a */
import { GenerarPlanificacion } from '../generarPlanificacion';
import { Actualizacion, Data } from '../calendario';
import { UltimaPlanificacion } from '../UltimaPlanificacion';

@Injectable({
    providedIn: 'root'
})
export class HorarioService {

    dataUrl = 'http://localhost:10975/app/planificacion/generar';
    urlUltimaPlanificacion = 'http://localhost:10975/app/planificacion';
    deleteActualizacionURL = 'http://localhost:10975/app/actualizacion/eliminar_actualizacion';
    updateActualizacionURL = 'http://localhost:10975/app/actualizacion/modificar_actualizacion';
    url_actualizacion = 'http://localhost:10975/app/actualizacion/crear_actualizacion';
    url_deletePlanificacionById = 'http://localhost:10975/app/planificacion/eliminar_planificacion/'

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    // Modal de AgregarActualización
    modalAddActualizacion: boolean = false;
    modalAddPlanificacion: boolean = false;
    modalItinerarioPlanificacion: boolean = false;

    constructor(
        private http: HttpClient) { }

    getHorarios(): Observable<UltimaPlanificacion> {
        return this.http.get<UltimaPlanificacion>(this.urlUltimaPlanificacion)
    }

    generarHorario(tiempo: GenerarPlanificacion): Observable<any> {
        return this.http.post<any>(this.dataUrl, tiempo);
    }

    deleteActualizacionId(actualizacion: Actualizacion): Observable<Actualizacion> {
        return this.http.delete<Actualizacion>(this.deleteActualizacionURL + '/' + actualizacion.actualizacion_id, this.httpOptions)
    }

    updateActualizacionId(actualizacion: Actualizacion): Observable<Actualizacion> {
        let params = JSON.stringify(actualizacion);
        return this.http.put<Actualizacion>(this.updateActualizacionURL + '/' + actualizacion.actualizacion_id, params, this.httpOptions)
    }

    deletePlanificacionId(planificacion: Data): Observable<Data> {
        return this.http.delete<Data>(this.url_deletePlanificacionById + planificacion.planificacion_id, this.httpOptions)
    }
}

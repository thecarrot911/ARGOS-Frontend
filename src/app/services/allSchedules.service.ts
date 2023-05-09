import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PlanificacionAnual, PlanificacionesAnuales } from '../calendarioanual';

@Injectable({
    providedIn: 'root'
})

export class AllSchedulesService {

    urlPlanificacionesAnuales = 'http://localhost:10975/app/planificacion/planificaciones_anuales'
    urlPlanificacionAnual = ''

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
    private http: HttpClient
    ) { }

    MostrarPlanificacionAnual(anio: number): Observable<PlanificacionAnual>{
        let query = new HttpParams().set('anio', anio);
        return this.http.get<PlanificacionAnual>(this.urlPlanificacionAnual, {params: query})
    }

    MostrarPlanificacionesAnuales(): Observable<PlanificacionesAnuales>{
        return this.http.get<PlanificacionesAnuales>(this.urlPlanificacionesAnuales)
    }


    /*deletePlanificacionId(planificacion: Data):Observable<Data>{
        return this.http.delete<Data>(this.url_deletePlanificacionById+'/'+planificacion.planificacion_id, this.httpOptions)
    }*/

    }

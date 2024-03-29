import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CalendarioAnual } from '../calendario';
import { PlanificacionAnios } from '../calendarioanual';
import { Planificacion } from '../UltimaPlanificacion';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})

export class AllSchedulesService {

    urlPlanificacionesAnuales = environment.apiDeploy+'app/planificacion/planificaciones';
    urlAniosPlanificaciones = environment.apiDeploy+'app/planificacion/planificaciones_anios';
    urlPlanificacionEliminar = environment.apiDeploy+'app/planificacion/eliminar'

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
    private http: HttpClient
    ) { }

    MostrarPlanificacionAnual(anio: number): Observable<CalendarioAnual>{
        let query = new HttpParams().set('anio', anio);
        return this.http.get<CalendarioAnual>(this.urlPlanificacionesAnuales, {params: query})
    }

    MostrarAniosPlanificaciones(): Observable<PlanificacionAnios>{
        return this.http.get<PlanificacionAnios>(this.urlAniosPlanificaciones)
    }

    BorrarPlanificacion(planificacion: Planificacion): Observable<any>{
        return this.http.post<any>(this.urlPlanificacionEliminar, planificacion)
    }

    /*deletePlanificacionId(planificacion: Data):Observable<Data>{
        return this.http.delete<Data>(this.url_deletePlanificacionById+'/'+planificacion.planificacion_id, this.httpOptions)
    }*/

}

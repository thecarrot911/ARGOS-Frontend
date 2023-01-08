import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Calendario, CalendarioAnual, Data } from '../calendario';
import { Calendarioanual } from '../calendarioanual';

@Injectable({
  providedIn: 'root'
})
export class AllSchedulesService {

planificacion_anual = 'http://localhost:10975/app/planificacion/mostrar_planificacion_anual';
url_deletePlanificacionById = 'http://localhost:10975/app/planificacion/eliminar_planificacion/'

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

constructor(
  private http: HttpClient
) { }

  getSchedulesByParameter(anio: string): Observable<Calendarioanual>{
    let params1 = new HttpParams().set('anio', anio);
    return this.http.get<Calendarioanual>(this.planificacion_anual, {params: params1})
  }

  deletePlanificacionId(planificacion: Data):Observable<Data>{
    return this.http.delete<Data>(this.url_deletePlanificacionById+'/'+planificacion.planificacion_id, this.httpOptions)
  }

}

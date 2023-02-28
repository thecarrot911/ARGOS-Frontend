import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; /* a */
import { HttpParams } from '@angular/common/http';
import { Observable, pipe, of, throwError } from 'rxjs'; /* a */
import { PlanificacionData, Tiempo } from '../tiempo';
import { AddActualizacion } from '../Addactualizacion';
import { Calendario, Actualizacion, Planificacion, Data } from '../calendario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  dataUrl = 'http://localhost:10975/app/planificacion/generar_planificacion';
  urlUltimaPlanificacion = 'http://localhost:10975/app/planificacion/mostrar_ultima';
  deleteActualizacionURL = 'http://localhost:10975/app/actualizacion/eliminar_actualizacion';
  updateActualizacionURL = 'http://localhost:10975/app/actualizacion/modificar_actualizacion';
  url_actualizacion = 'http://localhost:10975/app/actualizacion/crear_actualizacion';
  url_deletePlanificacionById = 'http://localhost:10975/app/planificacion/eliminar_planificacion/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getHorarios(): Observable<Calendario> {
    return this.http.get<Calendario>(this.urlUltimaPlanificacion)
  }

  generarHorario(tiempo: Tiempo): Observable<PlanificacionData> {
    return this.http.post<PlanificacionData>(this.dataUrl, tiempo);
  }

  guardarActualizacion(actualizacion: AddActualizacion): Observable<AddActualizacion> {
    return this.http.post<AddActualizacion>(this.url_actualizacion, actualizacion)
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

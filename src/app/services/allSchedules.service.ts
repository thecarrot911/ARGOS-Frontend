import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Calendario, CalendarioAnual } from '../calendario';
import { Calendarioanual } from '../calendarioanual';

@Injectable({
  providedIn: 'root'
})
export class AllSchedulesService {

constructor(
  private httpclient: HttpClient
) { }

getSchedulesByParameter(): Observable<Calendarioanual>{
  let params1 = new HttpParams().set('anio', '2028');
  return this.httpclient.get<Calendarioanual>("http://localhost:10975/app/planificacion/mostrar_planificacion_anual", {params: params1})
}

getSchedulesByParameter2(anio: string): Observable<Calendarioanual>{
  let params1 = new HttpParams().set('anio', anio);
  return this.httpclient.get<Calendarioanual>("http://localhost:10975/app/planificacion/mostrar_planificacion_anual", {params: params1})
}

}

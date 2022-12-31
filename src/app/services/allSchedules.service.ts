import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Calendario, CalendarioAnual } from '../calendario';
import { Calendarioanual } from '../calendarioanual';

@Injectable({
  providedIn: 'root'
})
export class AllSchedulesService {

planificacion_anual = 'http://localhost:10975/app/planificacion/mostrar_planificacion_anual';

constructor(
  private httpclient: HttpClient
) { }

  getSchedulesByParameter(anio: string): Observable<Calendarioanual>{
    let params1 = new HttpParams().set('anio', anio);
    return this.httpclient.get<Calendarioanual>(this.planificacion_anual, {params: params1})
  }

}

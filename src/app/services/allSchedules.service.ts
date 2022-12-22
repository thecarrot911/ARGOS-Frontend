import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Calendario, CalendarioAnual } from '../calendario';

@Injectable({
  providedIn: 'root'
})
export class AllSchedulesService {

constructor(
  private httpclient: HttpClient
) { }

getSchedulesByParameter(): Observable<any>{
  let params1 = new HttpParams().set('anio', "2024");
  return this.httpclient.get("http://localhost:10975/app/planificacion/mostrar_planificacion_anual", {params: params1})
}

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; /* a */
import { HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; /* a */
import { catchError, retry } from 'rxjs/operators'; /* a */
import { calendarData } from '../calendarData';
import { itinerarioData} from '../itinerarioData';
import { InfoData } from '../infoData';

/* const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
}; */

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  dataUrl= 'http://localhost:10975/app/planificacion/generar_planificacion'; /* BackendUrl para enviar añoo y mes*/

  constructor(
    private http: HttpClient){}

  items = [];

/*   getScheduleWorkers(){
    return this.http.get('http://localhost:10975/itinerario_de_vuelo/generar-planificacion-semanal');
  } */

  getScheduleWorkers(){
    return this.http.get('http://localhost:10975/app/planificacion/mostrar_ultima_planificacion?id_planificacion=42') /* get */
  }

  getItems(){
    return this.items;
  }

  clearData(){
    this.items = [];
    return this.items;
  }

/** POST: add a schedule(año-mes) to the database */
  addSchedule(calendardata: calendarData): Observable<calendarData> {
    let params = JSON.stringify(calendardata);
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this.http.post<calendarData>(this.dataUrl, calendardata,{headers: headers});
  }  
  
  genHorario(itinerariodata: itinerarioData): Observable<itinerarioData> {
    let params = JSON.stringify(itinerariodata);
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this.http.post<itinerarioData>(this.dataUrl, itinerariodata,{headers: headers});
  }

  genInfo(infotdata: InfoData): Observable<InfoData> {
    let params = JSON.stringify(infotdata);
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this.http.post<InfoData>(this.dataUrl, infotdata,{headers: headers});
  }

}

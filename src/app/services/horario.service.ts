import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; /* a */
import { HttpParams } from '@angular/common/http';
import { Observable, pipe, of, throwError } from 'rxjs'; /* a */
import { catchError, retry, tap, map } from 'rxjs/operators'; /* a */
import { calendarData } from '../calendarData';
/* import { itinerarioData} from '../itinerarioData'; */

import { Tiempo } from '../tiempo';
import { AddActualizacion } from '../Addactualizacion';
import { Calendario, Actualizacion } from '../calendario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  dataUrl= 'http://localhost:10975/app/planificacion/generar_planificacion';
  urlUltimaPlanificacion = 'http://localhost:10975/app/planificacion/mostrar_ultima';
  deleteActualizacionURL = 'http://localhost:10975/app/actualizacion/eliminar_actualizacion'
  updateActualizacionURL = 'http://localhost:10975/app/actualizacion/modificar_actualizacion'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient){}

  items = [];

   getHorarios(): Observable<Calendario>{
    return this.http.get<Calendario>('http://localhost:10975/app/planificacion/mostrar_ultima')
  }

    /* Itinerario de aviones Choques*/  /* siuuuuu */
    generarHorario(tiempo: Tiempo): Observable<Tiempo>{
      return this.http.post<Tiempo>(this.dataUrl, tiempo);
    }

    url_actualizacion =  'http://localhost:10975/app/actualizacion/crear_actualizacion';
    /* agregarActualización Component */
    guardarActualizacion(actualizacion: AddActualizacion):Observable<AddActualizacion>{
      return this.http.post<AddActualizacion>(this.url_actualizacion, actualizacion)
    }



  getItems(){
    return this.items;
  }

  clearData(){
    this.items = [];
    return this.items;
  }
/*   
  genHorario(itinerariodata: itinerarioData): Observable<itinerarioData> {
    let params = JSON.stringify(itinerariodata);
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this.http.post<itinerarioData>(this.dataUrl, itinerariodata,{headers: headers});
  } */






  /* Recibir último horario */
  getHorario(): Observable<Tiempo[]>{
    return this.http.get<Tiempo[]>(this.dataUrl)
  }

  deleteActualizacionId(actualizacion: Actualizacion): Observable<Actualizacion> {
/*     let headers = new HttpHeaders().set('Content-Type', 'application/json'); 
    return this.http.delete<Actualizacion>(this.deleteActualizacionURL+'/'+actualizacion.actualizacion_id,{headers: headers}); */
    /* const url = `${this.urlUltimaPlanificacion}/{planificacion_id}`; */
/*     const url = `${this.deleteActualizacionURL}/${actualizacion.actualizacion_id}`;
      console.log(url) */

    return this.http.delete<Actualizacion>(this.deleteActualizacionURL+'/'+actualizacion.actualizacion_id, this.httpOptions)
  }

  updateActualizacionId(actualizacion: Actualizacion): Observable<Actualizacion>{
    let params = JSON.stringify(actualizacion);
    return this.http.put<Actualizacion>(this.updateActualizacionURL+'/'+actualizacion.actualizacion_id, params, this.httpOptions)
  }


}

import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; /* a */
import { HttpParams } from '@angular/common/http';
import { Observable, pipe, of, throwError } from 'rxjs'; /* a */
import { catchError, retry, tap } from 'rxjs/operators'; /* a */
import { calendarData } from '../calendarData';
import { itinerarioData} from '../itinerarioData';
import { InfoData } from '../infoData';
import { Actualizacion } from '../actualizacion';
import { Tiempo } from '../tiempo';
import { ACTUALIZACIONES } from '../mock-actualizaciones';
import { map, filter } from 'rxjs/operators';
import { Calendario } from '../calendario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  dataUrl= 'http://localhost:10975/app/planificacion/generar_planificacion';
  urlUltimaPlanificacion = 'http://localhost:10975/app/planificacion/mostrar_ultima';

  constructor(
    private http: HttpClient){}

  items = [];

/*   getHorarios(){
    return this.http.get('http://localhost:10975/app/planificacion/mostrar_ultima')
  } */ 

   getHorarios(): Observable<Calendario>{
    return this.http.get<Calendario>('http://localhost:10975/app/planificacion/mostrar_ultima')
  }

  getItems(){
    return this.items;
  }

  clearData(){
    this.items = [];
    return this.items;
  }

/** POST: add a schedule(año-mes) to the backend */
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

  genInfo(infodata: InfoData): Observable<InfoData> {
    let params = JSON.stringify(infodata);
    let headers = new HttpHeaders().set('Content-type','application/json');
    return this.http.post<InfoData>(this.dataUrl, infodata,{headers: headers});
  }



  url_actualizacion =  'http://localhost:10975/app/actualizacion/crear_actualizacion';
  /* agregarActualización Component */
  guardarActualizacion(actualizacion: Actualizacion):Observable<Actualizacion>{
/*     let params = JSON.stringify(actualizacion);
    let headers = new HttpHeaders().set('Content-Type', 'applicacion/json'); */
    return this.http.post<Actualizacion>(this.url_actualizacion, actualizacion)
  }


  /* Itinerario de aviones Choques*/ 
  generarHorario(tiempo: Tiempo): Observable<Tiempo>{
    return this.http.post<Tiempo>(this.dataUrl, tiempo);
  }

  /* Recibir último horario */
  getHorario(): Observable<Tiempo[]>{
    return this.http.get<Tiempo[]>(this.dataUrl)
  }




  getActualizacionesVistas(): Observable<Actualizacion[]>{
    return this.http.get<Actualizacion[]>(this.dataUrl) /* INSERTAR URL PARA GET */
  }

  addActualizacionVista(actualizacion: Actualizacion): Observable<Actualizacion>{
    return this.http.post<Actualizacion>(this.dataUrl, actualizacion) /* Cambiar URL PARA POST */
  }
}

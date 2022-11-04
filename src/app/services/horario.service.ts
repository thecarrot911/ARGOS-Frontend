import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { generadorFecha } from '../generadorFecha';


@Injectable({
  providedIn: 'root'
})
export class HorarioService {


  items = [];

/*   getScheduleWorkers(){
    return this.http.get('http://localhost:10975/itinerario_de_vuelo/generar-planificacion-semanal');
  } */

  getScheduleWorkers(){
    return this.http.get('/assets/schedulecopy.json')
  }

  getItems(){
    return this.items;
  }

  clearData(){
    this.items = [];
    return this.items;
  }

constructor(
  private http: HttpClient
) { }

}

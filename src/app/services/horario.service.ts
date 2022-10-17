import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  getScheduleWorkers(){
    return this.http.get('http://localhost:10975/itinerario_de_vuelo/generar-planificacion-semanal');
  }

constructor(
  private http: HttpClient
) { }

}

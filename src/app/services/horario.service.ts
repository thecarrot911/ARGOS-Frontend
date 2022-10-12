import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {


  getScheduleWorkers(){
    return this.http.get('assets/schedule.json');
  }

constructor(
  private http: HttpClient
) { }

}

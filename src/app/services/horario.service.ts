import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  getScheduleWorkers(){
    this.http.get('assets/schedule.json').subscribe(data =>{
    return data;
    });
    
 
  }




  /* async getScheduleWorkers(){
    const response = await fetch('assets/schedulecopy.json');
    const json = await response.json()
 
    console.log(json.planificacion)
    
    json.planificacion.forEach((elemento: any) => {
      console.log(elemento)
    }) 
  } */



constructor(
  private http: HttpClient
) { }

}

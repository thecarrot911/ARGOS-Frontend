import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actualizacion } from '../actualizacion';



@Injectable({
  providedIn: 'root'
})
export class ActualizacionService {

constructor(
  private http: HttpClient
) { }

}



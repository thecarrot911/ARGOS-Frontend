import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from '../actualizacion';

@Injectable({
    providedIn: 'root'
})
export class ActualizacionService {

constructor(
    private http: HttpClient,
    
) { }
    
    private urlObtenerTipo = 'http://localhost:10975/app/actualizacion/tipo';


    MostrarTipo(): Observable<Respuesta> {
        return this.http.get<Respuesta>(this.urlObtenerTipo)
    }

}
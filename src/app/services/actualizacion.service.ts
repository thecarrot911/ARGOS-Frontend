import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RespuestaTipo, Actualizacion } from '../actualizacion';

@Injectable({
    providedIn: 'root'
})
export class ActualizacionService {

constructor(
    private http: HttpClient,
    
) { }
    
    private urlObtenerTipo = 'http://localhost:10975/app/actualizacion/tipo';
    private urlRegistrarActualizacion = 'http://localhost:10975/app/actualizacion/registrar_actualizacion';

    MostrarTipo(): Observable<RespuestaTipo> {
        return this.http.get<RespuestaTipo>(this.urlObtenerTipo)
    }

    RegistrarActualizacion(actualizacion: Actualizacion): Observable<any>{
        return this.http.post<any>(this.urlRegistrarActualizacion,actualizacion);
    }

}
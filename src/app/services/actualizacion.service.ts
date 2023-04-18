import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RespuestaTipo, Actualizacion } from '../actualizacion';
import { Planificacion } from '../UltimaPlanificacion';

@Injectable({
    providedIn: 'root'
})
export class ActualizacionService {

constructor(
    private http: HttpClient,
    
) { }
    
    private urlObtenerTipo = 'http://localhost:10975/app/actualizacion/formulario';
    private urlRegistrarActualizacion = 'http://localhost:10975/app/actualizacion/registrar_actualizacion';

    MostrarFormulario(planificacion_id: number): Observable<RespuestaTipo> {
        let paramsPlanificacionId = new HttpParams().set('planificacion_id', planificacion_id)
        return this.http.get<RespuestaTipo>(this.urlObtenerTipo,{params: paramsPlanificacionId})
    }

    RegistrarActualizacion(actualizacion: Actualizacion): Observable<RespuestaTipo>{
        return this.http.post<RespuestaTipo>(this.urlRegistrarActualizacion,actualizacion);
    }

}
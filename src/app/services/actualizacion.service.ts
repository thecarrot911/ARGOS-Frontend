import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RespuestaTipo, Actualizacion } from '../actualizacion';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ActualizacionService {

constructor(
    private http: HttpClient,
    
) { }
    
    private urlObtenerTipo = environment.apiDeploy+'app/actualizacion/formulario';
    private urlRegistrarActualizacion = environment.apiDeploy+'app/actualizacion/registrar_actualizacion';
    private urlEliminarActualizacion = environment.apiDeploy+'app/actualizacion/eliminar';

    MostrarFormulario(planificacion_id: number): Observable<RespuestaTipo> {
        let paramsPlanificacionId = new HttpParams().set('planificacion_id', planificacion_id)
        return this.http.get<RespuestaTipo>(this.urlObtenerTipo,{params: paramsPlanificacionId})
    }

    RegistrarActualizacion(actualizacion: Actualizacion): Observable<RespuestaTipo>{
        return this.http.post<RespuestaTipo>(this.urlRegistrarActualizacion,actualizacion);
    }

    EliminarActualizacion(id: number, tipo: string): Observable<any>{
        let query = new HttpParams().set('id', id).set('tipo', tipo)
        return this.http.delete<any>(this.urlEliminarActualizacion, {params: query});
    }

}
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaEmpleados, Empleado, Credencial, EmpleadoCredencial } from '../empleados';

@Injectable({
  providedIn: 'root'
})
export class AllempleadosService {

  urlEmpleados = 'http://localhost:10975/app/empleado';
  urlRegistrarEmpleado = 'http://localhost:10975/app/empleado/registrar_empleado';
  urlEliminarEmpleado = 'http://localhost:10975/app/empleado/eliminar_empleado';
  urlPerfilEmpleado = 'http://localhost:10975/app/empleado/perfil'
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  // Empleado

  MostrarEmpleados(): Observable<ListaEmpleados> {
    return this.http.get<ListaEmpleados>(this.urlEmpleados);
  }

  RegistrarEmpleados(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.urlRegistrarEmpleado, empleado);
  }

  EliminarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.delete<Empleado>(this.urlEliminarEmpleado + '/' + empleado.rut, this.httpOptions);
  }

  // Credenciales

  urlRegistrarCredencial = 'http://localhost:10975/app/credencial/registrar_credencial'
  urlMostrarCredencial = 'http://localhost:10975/app/credencial/mostrar_credencial'
  urlEliminarCredencial = 'http://localhost:10975/app/credencial/eliminar_credencial'

  RegistrarCredencial(credencial: Credencial): Observable<Credencial>{
    return this.http.post<Credencial>(this.urlRegistrarCredencial, credencial);
  }

  MostrarCredenciales(rut: string): Observable<EmpleadoCredencial>{
    let paramsCredencial  = new HttpParams().set('rut',rut)
    return this.http.get<EmpleadoCredencial>(this.urlMostrarCredencial, {params: paramsCredencial})
  }

  EliminarCredencial(credencial: Credencial): Observable<Credencial>{
    return this.http.delete<Credencial>(this.urlEliminarCredencial + '/' + credencial.credencial_id, this.httpOptions);
  }


}

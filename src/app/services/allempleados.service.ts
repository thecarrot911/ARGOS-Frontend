import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaEmpleados, Empleado, Credencial, EmpleadoCredencial, EmpleadoData } from '../empleados';

@Injectable({
  providedIn: 'root'
})
export class AllempleadosService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Modals de Empleado 
  modalAddEmpleadoVisible: boolean = false;
  modalUpdateEmpleadoVisible: boolean = false;

  // Modals de Credencial
  modalCredencialVisible: boolean = false;
  modalAddCredencialVisible : boolean = false;
  modalUpdateCredencialVisible: boolean = false;

  constructor(
    private http: HttpClient
  ) { }
 
  // Empleado
  urlEmpleados = 'http://localhost:10975/app/empleado';
  urlRegistrarEmpleado = 'http://localhost:10975/app/empleado/registrar_empleado';
  urlEliminarEmpleado = 'http://localhost:10975/app/empleado/eliminar_empleado';
  urlModificarEmpleado = 'http://localhost:10975/app/empleado/modificar_empleado'

  MostrarEmpleados(): Observable<ListaEmpleados> {
    return this.http.get<ListaEmpleados>(this.urlEmpleados);
  }
  RegistrarEmpleados(empleado: Empleado): Observable<EmpleadoData> {
    return this.http.post<EmpleadoData>(this.urlRegistrarEmpleado, empleado);
  }
  ModificarEmpleado(empleado: Empleado): Observable<Empleado>{
    let params = JSON.stringify(empleado);
    return this.http.put<Empleado>(this.urlModificarEmpleado, params, this.httpOptions);
  }
  EliminarEmpleado(empleado: Empleado): Observable<EmpleadoData> {
    return this.http.delete<EmpleadoData>(this.urlEliminarEmpleado + '/' + empleado.rut, this.httpOptions);
  }

  // Credenciales 
  urlRegistrarCredencial = 'http://localhost:10975/app/credencial/registrar_credencial'
  urlMostrarCredencial = 'http://localhost:10975/app/credencial/mostrar_credencial'
  urlEliminarCredencial = 'http://localhost:10975/app/credencial/eliminar_credencial'
  urlRenovarCredencial = 'http://localhost:10975/app/credencial/renovar_credencial'

  MostrarCredenciales(rut: string): Observable<EmpleadoCredencial>{
    let paramsCredencial  = new HttpParams().set('rut',rut)
    return this.http.get<EmpleadoCredencial>(this.urlMostrarCredencial, {params: paramsCredencial})
  }
  RegistrarCredencial(credencial: Credencial): Observable<EmpleadoCredencial> {
    return this.http.post<EmpleadoCredencial>(this.urlRegistrarCredencial, credencial);
  }
  RenovarCredencial(credencial: Credencial): Observable<Credencial>{
    let params = JSON.stringify(credencial);
    return this.http.put<Credencial>(this.urlRenovarCredencial, params, this.httpOptions);
  }
  EliminarCredencial(credencial: Credencial): Observable<Credencial>{
    return this.http.delete<Credencial>(this.urlEliminarCredencial + '/' + credencial.credencial_id, this.httpOptions);
  }


}

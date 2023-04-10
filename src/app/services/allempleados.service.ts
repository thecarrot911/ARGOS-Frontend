import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ListaEmpleados, Empleado, Credencial, EmpleadoCredencial, EmpleadoData, VencimientoCredencial } from '../empleados';
import * as fileExtension from 'file-extension';


@Injectable({
  providedIn: 'root'
})
export class AllempleadosService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Control de imágen en el menú de navegación
  vencimientoCredencial: boolean = false;

  // Modals de Empleado 
  modalAddEmpleadoVisible: boolean = false;
  modalUpdateEmpleadoVisible: boolean = false;

  // Modals de Credencial
  modalCredencialVisible: boolean = false;
  modalAddCredencialVisible : boolean = false;
  modalUpdateCredencialVisible: boolean = false;

  // Probando función para emitir
  private ejecutarFuncionSource = new Subject<void>();

  ejecutarFuncion$ = this.ejecutarFuncionSource.asObservable();

  ejecutarFuncion() {
    this.ejecutarFuncionSource.next();
  }


  constructor(
    private http: HttpClient
  ) { }
 
  // Empleado
  urlEmpleados = 'http://localhost:10975/app/empleado';
  urlRegistrarEmpleado = 'http://localhost:10975/app/empleado/registrar_empleado';
  urlEliminarEmpleado = 'http://localhost:10975/app/empleado/eliminar_empleado';
  urlModificarEmpleado = 'http://localhost:10975/app/empleado/modificar_empleado';

  MostrarEmpleados(): Observable<ListaEmpleados> {
    return this.http.get<ListaEmpleados>(this.urlEmpleados);
  }
  RegistrarEmpleados(empleado: Empleado): Observable<EmpleadoData> {
    
    const formData = new FormData();
    formData.append('imagen', empleado.imagen, empleado.rut + '.' + fileExtension(empleado.imagen.name))
    formData.append('nombre_paterno',empleado.nombre_paterno)
    formData.append('nombre_materno', empleado.nombre_materno)
    formData.append('apellido_paterno', empleado.apellido_paterno)
    formData.append('apellido_materno', empleado.apellido_materno)
    formData.append('rut', empleado.rut)
    return this.http.post<EmpleadoData>(this.urlRegistrarEmpleado, formData);
  }
  ModificarEmpleado(empleado: Empleado): Observable<EmpleadoData>{
    let params = JSON.stringify(empleado);
    return this.http.put<EmpleadoData>(this.urlModificarEmpleado + '/' + empleado.rut, params, this.httpOptions);
  }
  EliminarEmpleado(empleado: Empleado): Observable<EmpleadoData> {
    let queryRut = new HttpParams().set('rut', empleado.rut)
    return this.http.put<EmpleadoData>(this.urlEliminarEmpleado, empleado ,{params: queryRut});
  }

  // Credenciales 
  urlRegistrarCredencial = 'http://localhost:10975/app/credencial/registrar'
  urlMostrarCredencial = 'http://localhost:10975/app/credencial/mostrar'
  urlEliminarCredencial = 'http://localhost:10975/app/credencial/eliminar'
  urlRenovarCredencial = 'http://localhost:10975/app/credencial/renovar'
  urlFechaVencimientoCredencial = 'http://localhost:10975/app/credencial/vencidas'

  MostrarCredenciales(rut: string): Observable<EmpleadoCredencial>{
    let paramsCredencial  = new HttpParams().set('rut',rut)
    return this.http.get<EmpleadoCredencial>(this.urlMostrarCredencial, {params: paramsCredencial})
  }
  RegistrarCredencial(credencial: Credencial): Observable<EmpleadoCredencial> {
    return this.http.post<EmpleadoCredencial>(this.urlRegistrarCredencial, credencial);
  }
  RenovarCredencial(credencial: Credencial): Observable<EmpleadoCredencial>{
    return this.http.post<EmpleadoCredencial>(this.urlRenovarCredencial, credencial);
  }
  EliminarCredencial(credencial: Credencial): Observable<EmpleadoCredencial>{
    return this.http.delete<EmpleadoCredencial>(this.urlEliminarCredencial + '/' + credencial.credencial_id, this.httpOptions);
  }
  VencimientoCredencial(): Observable<VencimientoCredencial>{
    return this.http.get<VencimientoCredencial>(this.urlFechaVencimientoCredencial);
  }
}

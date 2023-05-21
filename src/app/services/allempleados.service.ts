import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ListaEmpleados, Empleado, Credencial, EmpleadoCredencial, EmpleadoData, VencimientoCredencial, DataEmpleados } from '../empleados';
import * as fileExtension from 'file-extension';
import { environment } from '../../environments/environment';


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
    urlEmpleados = environment.apiDeploy+'app/empleado';
    urlRegistrarEmpleado = environment.apiDeploy+'app/empleado/registrar_empleado';
    urlEliminarEmpleado = environment.apiDeploy+'app/empleado/eliminar_empleado';
    urlModificarEmpleado = environment.apiDeploy+'app/empleado/modificar_empleado';
    urlPerfilEmpleado = environment.apiDeploy+'app/empleado/perfil';

    MostrarPerfil(): Observable<DataEmpleados>{
        return this.http.get<DataEmpleados>(this.urlPerfilEmpleado)
    }

    MostrarEmpleados(): Observable<ListaEmpleados> {
        return this.http.get<ListaEmpleados>(this.urlEmpleados);
    }
    RegistrarEmpleados(empleado: Empleado): Observable<EmpleadoData> {
        
        const formData = new FormData();
        if(empleado.imagen != null && empleado.imagen != 'null'){
            // Con imágen
            formData.append('imagen', empleado.imagen, empleado.rut + '.' + fileExtension(empleado.imagen.name))
        }else{
            // Sin imágen
            formData.append('imagen',null);
        }
        formData.append('nombre_paterno',empleado.nombre_paterno)
        formData.append('nombre_materno', empleado.nombre_materno)
        formData.append('apellido_paterno', empleado.apellido_paterno)
        formData.append('apellido_materno', empleado.apellido_materno)
        formData.append('rut', empleado.rut)
        return this.http.post<EmpleadoData>(this.urlRegistrarEmpleado, formData);
    }
    
    ModificarEmpleado(empleado: Empleado, imageURL:string): Observable<EmpleadoData>{
        const formData = new FormData();
        if (empleado.imagen != 'null'){
            // Con imágen
            if (imageURL == empleado.imagen){

                formData.append('imagenURL',empleado.imagen);
            }else{

                formData.append('imagen', empleado.imagen, empleado.rut + '.' + fileExtension(empleado.imagen.name));
            }
        }else{
            // Sin imágen

            formData.append('imagen',null);
        }
        formData.append('nombre_paterno', empleado.nombre_paterno)
        formData.append('nombre_materno', empleado.nombre_materno)
        formData.append('apellido_paterno', empleado.apellido_paterno)
        formData.append('apellido_materno', empleado.apellido_materno)
        formData.append('rut', empleado.rut)
        return this.http.put<EmpleadoData>(this.urlModificarEmpleado, formData);
    }

    EliminarEmpleado(empleado: Empleado): Observable<EmpleadoData> {
        let queryRut = new HttpParams().set('rut', empleado.rut)
        return this.http.put<EmpleadoData>(this.urlEliminarEmpleado, empleado ,{params: queryRut});
    }

    // Credenciales 
    urlRegistrarCredencial = environment.apiDeploy+'app/credencial/registrar'
    urlMostrarCredencial = environment.apiDeploy+'app/credencial/mostrar'
    urlEliminarCredencial = environment.apiDeploy+'app/credencial/eliminar'
    urlRenovarCredencial = environment.apiDeploy+'app/credencial/renovar'
    urlFechaVencimientoCredencial = environment.apiDeploy+'app/credencial/vencidas'

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

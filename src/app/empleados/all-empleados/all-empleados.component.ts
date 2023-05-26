import { Component, OnInit } from '@angular/core';
import { AllempleadosService } from '../../services/allempleados.service';
import { Credencial, Empleado } from '../../empleados';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatoPlanificacion } from '../../UltimaPlanificacion';



@Component({
    selector: 'app-all-empleados',
    templateUrl: './all-empleados.component.html',
    styleUrls: ['./all-empleados.component.css']
})
export class AllEmpleadosComponent implements OnInit {

    CurrentDate = new Date();
    today_is_chile = this.CurrentDate.toLocaleDateString('es-cl');

    public listaCredenciales: Empleado[] = [];
    public listaPlanificacion: DatoPlanificacion[];

    public credencialActual: Empleado;
    public planificacionActual: DatoPlanificacion;

    // Variable para mostrar credenciales
    public cantidadCredenciales: number;
    public credencialEmpleado: Credencial[] = [];
    public rutEmpleadoSelecionado: string;
    
    // Variable para modificar empleado
    public modificarEmpleado: Empleado;

    constructor(
        public empleadoService: AllempleadosService,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.empleadoService.MostrarPerfil().subscribe(
            response =>{
                this.listaCredenciales = response.data.credencial || [];
                this.BuscandoVencimiento();
                this.listaPlanificacion = response.data.planificacion || [];
                this.credencialActual = response.data.credencial[0];
                this.SeleccionEmpleado(this.credencialActual)

            },error =>{
                console.error(error)
            }
        )
    }

    BuscandoVencimiento(){
        for (const empleado of this.listaCredenciales){
            if(empleado.credencial != undefined){
                for(const credencial of empleado.credencial){
                    if(credencial.vence == true){ 
                        empleado.vence = true;
                    }
                    else empleado.vence = false;
                }
            }
        };
    }

    SeleccionEmpleado(empleado: Empleado){
        this.credencialActual = null;
        this.planificacionActual = null;

        this.listaCredenciales.forEach(emp =>{
            if(emp.rut === empleado.rut){
                emp.mostrar = true;
                this.credencialActual = empleado
                console.log(this.credencialActual)
            }else{
                emp.mostrar = false; 
            }
        })

        this.listaPlanificacion.forEach(emp =>{
            if (emp.rut === empleado.rut) {
                emp.mostrar = true
                this.planificacionActual = emp;
            }else{
                emp.mostrar = false
            }
        })
    };

    // Modal para modificar empleado
    mostrarModalModificarEmpleado(empleado: Empleado): void {
        this.modificarEmpleado = empleado;
        this.empleadoService.modalUpdateEmpleadoVisible = !this.empleadoService.modalUpdateEmpleadoVisible
    }
    // Borrar empleado
    borrarEmpleado(empleado: Empleado): void {
        Swal.fire({
        title: '¿Estás seguro?',
        text: "Estas eliminando a "+empleado.nombre_paterno+" "+empleado.apellido_paterno+" del sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borralo!'
        }).then((result) => {
        if (result.isConfirmed) {
            
            this.empleadoService.EliminarEmpleado(empleado).subscribe(
            response => {
                Swal.fire(
                'Eliminado!',
                response.msg,
                'success'
                )
                this.ngOnInit();
            },
            error => {
                console.error(error)
            }
            )
        }
        })
    }
    
    // Modal para registrar empleado
    mostrarRegistroEmpleado(): void{
        this.empleadoService.modalAddEmpleadoVisible = !this.empleadoService.modalAddEmpleadoVisible
    }
    
    // Modal para mostrar las Credenciales 
    mostrarCredencial(credencial: Credencial[] , rut: string){
        this.credencialEmpleado = credencial;
        this.rutEmpleadoSelecionado = rut
    }

    
}

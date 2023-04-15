import { Component, OnInit } from '@angular/core';
import { AllempleadosService } from '../../services/allempleados.service';
import { Credencial, Empleado } from '../../empleados';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
    selector: 'app-all-empleados',
    templateUrl: './all-empleados.component.html',
    styleUrls: ['./all-empleados.component.css']
})
export class AllEmpleadosComponent implements OnInit {

    CurrentDate = new Date();
    today_is_chile = this.CurrentDate.toLocaleDateString('es-cl');

    listaEmpleados: Empleado[];

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
        this.empleadoService.MostrarEmpleados().subscribe(
            response => {
                this.listaEmpleados = response.data;
            },
            error => {
                console.log(error);
            }
        )
    }

    VerPerfil(rut: string): void{
        this.router.navigate(['/perfil/'+rut]);
    }

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
        this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible
        this.rutEmpleadoSelecionado = rut
    }

}

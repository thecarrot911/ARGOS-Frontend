import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AllempleadosService } from '../../services/allempleados.service';
import { Credencial, Empleado } from '../../empleados';
import Swal from 'sweetalert2';
import { add, isAfter, isBefore, isWithinInterval } from 'date-fns';


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
  

  // Fecha del día

  public fecha1: any;
  public fecha2: any;
  public rangoUnMes: any;
  public inicioRango: any;
  public finRango: any;
  public dentroDeRango: any;

  constructor(
    public empleadoService: AllempleadosService
  ) { }

  ngOnInit(): void {
    this.empleadoService.ejecutarFuncion();
    this.empleadoService.MostrarEmpleados().subscribe(
      response => {
        this.listaEmpleados = response.data;
      },
      error => {
        console.log(error);
      }
    )
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
      text: "Estas eliminando a "+empleado.nombre_materno+" "+empleado.apellido_paterno+" del sistema",
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

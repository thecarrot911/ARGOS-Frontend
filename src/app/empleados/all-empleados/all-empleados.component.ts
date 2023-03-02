import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AllempleadosService } from '../../services/allempleados.service';
import { Credencial, Empleado } from '../../empleados';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

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
  
  // Variable para modificar empleado
  public modificarEmpleado: Empleado;
  
  constructor(
    public empleadoService: AllempleadosService
  ) { }

  ngOnInit(): void {
    this.cargaEmpleados();
  }

  // Mostrar los Empleados
  cargaEmpleados(): void {
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
    this.empleadoService.EliminarEmpleado(empleado).subscribe(
      response=>{
        this.ngOnInit();
      },
      error => {
        console.log(error)
      }
    )
  }
  // Modal para registrar empleado
  mostrarRegistroEmpleado(): void{
    this.empleadoService.modalAddEmpleadoVisible = !this.empleadoService.modalAddEmpleadoVisible
  }
  // Modal para mostrar las Credenciales 
  mostrarCredencial(credencial: Credencial[]){
    this.credencialEmpleado = credencial;
    this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible
  }

}

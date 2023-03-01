import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AllempleadosService } from '../services/allempleados.service';
import { Credencial, Empleado } from '../empleados';
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
  
  constructor(
    public empleadoService: AllempleadosService
  ) { }

  ngOnInit(): void {
    this.cargaEmpleados();
  }

  // Funciones de Empleados
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
  mostrarRegistroEmpleado(): void{
    this.empleadoService.modalAddEmpleadoVisible = !this.empleadoService.modalAddEmpleadoVisible
  }
  // Funciones de Credenciales
  mostrarCredencial(credencial: Credencial[]){
    this.credencialEmpleado = credencial;
    this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible
  }

  eliminarCredencial(){
    this.ngOnInit();
  }
}

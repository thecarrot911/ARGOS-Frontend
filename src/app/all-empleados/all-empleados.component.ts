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

  // Modal   
  public modalEmpleado = document.getElementById('modal_empleado');
  public modalAgregarCredencial = document.getElementById('modal_AgregarCredencial');
  public modalMostrarCredencial = document.getElementById('modal_MostrarCredencial');
  public modalRenovarCredencial = document.getElementById('modal_RenovarCredencial');

  // Variable para mostrar credenciales
  public cantidadCredenciales: number;
  public modalCredencial = document.getElementById('modal_credencial');
  public credencialEmpleado: Credencial[];

  // Funciones emitidores de eventos
  
  // Formulario agregar empleados
  empleado: Empleado = {
    nombre_paterno: '',
    nombre_materno: '',
    apellido_paterno: '',
    apellido_materno: '',
    rut: ''
  };


  constructor(
    private empleadoService: AllempleadosService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.cargaEmpleados();
  }

  // Funciones de Empleados
  cargaEmpleados(): void {
    this.empleadoService.MostrarEmpleados().subscribe(
      response => {
        this.listaEmpleados = response.data;
        console.log("-")
        console.log(this.listaEmpleados)
      },
      error => {
        console.log(error);
      }
    )
  }
  registrarEmpleado() {
    this.empleadoService.RegistrarEmpleados(this.empleado).subscribe(
      response => {
        this.ngOnInit();
        this.limpiarFormularioEmpleado();
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
    this.modalEmpleado = document.getElementById('modal_empleado');
    if (this.modalEmpleado != null){
      this.modalEmpleado.classList.remove('hidden')
    }
  }
  cerrarModalEmpleado(): void{
    this.limpiarFormularioEmpleado();
  }
  limpiarFormularioEmpleado() {
    this.modalEmpleado.classList.add('hidden');
    this.empleado = {
      nombre_paterno: '',
      nombre_materno: '',
      apellido_paterno: '',
      apellido_materno: '',
      rut: ''
    };
  }
  // Funciones de Credenciales
  mostrarModalCredencial(rut: string): void {
    this.empleadoService.MostrarCredenciales(rut).subscribe(
      response=>{
        this.credencialEmpleado = response.data;
        console.log(this.credencialEmpleado)
      }, error=>{
        console.log(error);
      }
    )
    this.modalCredencial = document.getElementById('modal_credencial');
    if (this.modalCredencial != null) {
      this.modalCredencial.classList.remove('hidden');
    }    /*
    this.empleadoCredencial = credencial
    this.cantidadCredenciales = this.empleadoCredencial.length
    this.modalCredencial = document.getElementById('modal_credencial');
    if (this.modalCredencial != null) {
      this.modalCredencial.classList.remove('hidden');
    }*/
  }
  
  renovarModalCredencial(): void{

  }

  eliminarModalCredencial(event): void{
    this.empleadoService.EliminarCredencial(event.credencial).subscribe(
      respone=>{
        this.ngOnInit();
        
      },
      error => {
        console.log(error)
      }
    )
  }
}

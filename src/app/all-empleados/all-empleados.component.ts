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
  public modalControlCredencial :boolean = false;

  // Variable para mostrar credenciales
  public cantidadCredenciales: number;
  public credencialEmpleado: Credencial[] = [];
  
  // Formulario agregar empleados
  empleado: Empleado = {
    nombre_paterno: '',
    nombre_materno: '',
    apellido_paterno: '',
    apellido_materno: '',
    rut: ''
  };


  constructor(
    public empleadoService: AllempleadosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cargaEmpleados();
    this.empleadoService.reloadEvent.subscribe((reload: boolean) =>{
      if(reload){
        this.cargaEmpleados();
      }
    })
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
  mostrarCredencial(credencial: Credencial[]){
    //this.credencialEmpleado = credencial;
    this.empleadoService.modalCredencialEmpleado = credencial;
    this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible
  }
}

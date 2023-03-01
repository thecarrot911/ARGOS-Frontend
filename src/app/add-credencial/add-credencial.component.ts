import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Empleado } from '../empleados';
import { AllempleadosService } from '../services/allempleados.service';

@Component({
  selector: 'app-add-credencial',
  templateUrl: './add-credencial.component.html',
  styleUrls: ['./add-credencial.component.css']
})
export class AddCredencialComponent implements OnInit {

  constructor(
    public empleadoService: AllempleadosService
  )
  {}

  // Variables emitidas al componente [all-empleados]
  @Output() recargaPagina = new EventEmitter();


  // Formulario agregar empleados
  empleado: Empleado = {
    nombre_paterno: '',
    nombre_materno: '',
    apellido_paterno: '',
    apellido_materno: '',
    rut: ''
  };

  ngOnInit(): void {
  }

  cerrarModalEmpleado(){
    this.empleadoService.modalAddEmpleadoVisible = !this.empleadoService.modalAddEmpleadoVisible
    this.empleado = {
      nombre_paterno: '',
      nombre_materno: '',
      apellido_paterno: '',
      apellido_materno: '',
      rut: ''
    };
    this.recargaPagina.emit();
  }

  registrarEmpleado(){
    console.log(this.empleado)
    this.empleadoService.RegistrarEmpleados(this.empleado).subscribe(
      response => {
        this.ngOnInit();
        this.cerrarModalEmpleado();
      },
      error => {
        console.log(error);
      }
    )
  }
}

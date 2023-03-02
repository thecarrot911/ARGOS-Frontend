import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Credencial, Empleado } from '../../empleados';
import { AllempleadosService } from '../../services/allempleados.service';

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


  // Formulario agregar credencial
  credencial: Credencial = {
    fecha_vencimiento: '',
    fecha_emision: '',
    tipo: '',
    numero: '',
    empleado_rut: ''
  }
  // Borra el de abajo xd
  empleado: Empleado = {
    nombre_paterno: '',
    nombre_materno: '',
    apellido_paterno: '',
    apellido_materno: '',
    rut: ''
  };

  ngOnInit(): void {
  }

  registrar(){
  }
  
  cerrar(){
    this.empleadoService.modalAddCredencialVisible = !this.empleadoService.modalAddCredencialVisible
    this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Credencial, Empleado } from '../../empleados';
import { AllempleadosService } from '../../services/allempleados.service';
import { FormGroup } from '@angular/forms';
import { RenovarCredencial } from '../../updateEmpleado';

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
  renovarCredencial: RenovarCredencial = {
    tipo: '',
    numero: 0,
    rut: '',
    fecha_vencimiento: '',
    fecha_emision: ''
  }

  ngOnInit(): void {
  }

  registrar(){
  }
  
  cerrar(){
    this.empleadoService.modalAddCredencialVisible = !this.empleadoService.modalAddCredencialVisible
    this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible
  }
}

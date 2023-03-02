import { Component, Input, OnInit } from '@angular/core';
import { Credencial } from 'src/app/empleados';
import { AllempleadosService } from 'src/app/services/allempleados.service';
import { RenovarCredencial } from 'src/app/updateEmpleado';

@Component({
  selector: 'app-update-credencial',
  templateUrl: './update-credencial.component.html',
  styleUrls: ['./update-credencial.component.css']
})
export class UpdateCredencialComponent implements OnInit {

  constructor(
    public empleadoService: AllempleadosService
  ) { }

  @Input() credencialEmpleado : Credencial;

  renovarCredencial: RenovarCredencial = {
    fecha_vencimiento: '',
    fecha_emision: '',
    tipo: '',
    numero: 0,
    rut: ''
  }
  
  ngOnInit(): void {

  }

  cerrar(){

  }
  registrar(){

  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from 'src/app/empleados';
import { AllempleadosService } from 'src/app/services/allempleados.service';

@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.component.html',
  styleUrls: ['./update-empleado.component.css']
})
export class UpdateEmpleadoComponent implements OnInit {

  // Variables recibidas por el componente [all-empleados]
  @Input() updateEmpleado: Empleado; 
  
  empleado: Empleado = {
    nombre_paterno: '',
    nombre_materno: '',
    apellido_paterno: '',
    apellido_materno: '',
    rut: ''
  };

  constructor(
    public empleadoService: AllempleadosService

  ) { }

  ngOnInit(): void {

  }

  cerrar(): void{
    this.empleadoService.modalUpdateEmpleadoVisible = !this.empleadoService.modalUpdateEmpleadoVisible 
  }

  modificar(): void{

  }

}

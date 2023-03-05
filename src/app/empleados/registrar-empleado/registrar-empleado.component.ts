import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Empleado } from '../../empleados';
import { Router} from '@angular/router';
import { AllempleadosService } from 'src/app/services/allempleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent implements OnInit {


  empleado: Empleado = {
    nombre_paterno: '',
    nombre_materno: '',
    apellido_paterno: '',
    apellido_materno: '',
    rut: ''
  };

  constructor(
    private empleadoService: AllempleadosService,
    private router: Router,
  ) { }

  // Variables emitidas al componente [all-empleados]
  @Output() recargaPaginaEmpleado = new EventEmitter();

  ngOnInit(): void {

  }

  registrarEmpleado() {
    this.empleadoService.RegistrarEmpleados(this.empleado).subscribe(
      response => {
        this.empleadoService.modalAddEmpleadoVisible = !this.empleadoService.modalAddEmpleadoVisible;
        this.recargaPaginaEmpleado.emit();
        Swal.fire({
          icon: 'success',
          title: response.msg,
          showConfirmButton: false,
          timer: 1500
        })
      },
      error => {
        console.error(error);
      }
    )
  }
  
  cerrar(): void{
    this.empleadoService.modalAddEmpleadoVisible = !this.empleadoService.modalAddEmpleadoVisible
  }

}

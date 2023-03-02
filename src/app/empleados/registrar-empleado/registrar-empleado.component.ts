import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../empleados';
import { Router} from '@angular/router';
import { AllempleadosService } from 'src/app/services/allempleados.service';

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

  ngOnInit(): void {

  }

  registrarEmpleado() {
    this.empleadoService.RegistrarEmpleados(this.empleado).subscribe(
      response => {
        this.router.navigate(['/allEmpleados'])
      },
      error => {
        console.log(error);
      }
    )
  }
  
  cerrar(): void{
    this.empleadoService.modalAddEmpleadoVisible = !this.empleadoService.modalAddEmpleadoVisible
  }

}

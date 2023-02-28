import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleados';
import { FormGroup } from '@angular/forms';
import { AllempleadosService } from '../services/allempleados.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  registrarEmpleado() {
    this.empleadoService.RegistrarEmpleados(this.empleado).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/allEmpleados'])
      },
      error => {
        console.log(error);
      }
    )
  }

}

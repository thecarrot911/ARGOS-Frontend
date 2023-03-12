import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Empleado } from '../../empleados';
import { Router} from '@angular/router';
import { AllempleadosService } from 'src/app/services/allempleados.service';
import Swal from 'sweetalert2';
import { validateRUT } from 'validar-rut'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  public boolInputRut: boolean = true;

    
  formEmpleado: FormGroup;

  constructor(
    private empleadoService: AllempleadosService
  ){ 
  }

  // Variables emitidas al componente [all-empleados]
  @Output() recargaPaginaEmpleado = new EventEmitter();

  ngOnInit(): void {

  }

  formatoRut(){
    let rut = this.empleado.rut;

    // Eliminar cualquier caracter que no sea un número o una letra "k" o "K"
    rut = rut.replace(/[^0-9kK]/g, '');

    // Agregar puntos y guión de acuerdo al formato de RUT en Chile
    rut = rut.replace(/^(\d{1,2})(\d{3})(\d{3})([0-9kK]{1})$/, '$1.$2.$3-$4');

    // Actualizar el valor del campo de entrada en la propiedad empleado.rut
    
    this.boolInputRut = validateRUT(rut);
    console.log(this.boolInputRut)
    this.empleado.rut = rut;
  }

  

  registrarEmpleado() {
    this.empleadoService.RegistrarEmpleados(this.empleado).subscribe(
      response => {
        this.empleadoService.modalAddEmpleadoVisible = !this.empleadoService.modalAddEmpleadoVisible;
        this.recargaPaginaEmpleado.emit();
        if(response.error){
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: response.msg
          })
        }else{
          Swal.fire({
            icon: 'success',
            title: response.msg,
            showConfirmButton: false,
            timer: 1500
          })
        }
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

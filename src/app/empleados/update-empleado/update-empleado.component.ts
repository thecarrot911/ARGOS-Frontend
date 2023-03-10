import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Empleado } from 'src/app/empleados';
import { AllempleadosService } from 'src/app/services/allempleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.component.html',
  styleUrls: ['./update-empleado.component.css']
})
export class UpdateEmpleadoComponent implements OnInit {

  // Variables recibidas por el componente [all-empleados]
  @Input() updateEmpleado: Empleado; 
  
  @Output() recargaEmpleadoPagina = new EventEmitter();

  // Variable boleanas de Empleados
  public boolPrimerNombre: boolean = true;
  public boolSegundoNombre: boolean = true;
  public boolPrimerApellido : boolean = true;
  public boolSegundoApellido: boolean = true;
  public boolRut: boolean = true;

  public empleado: Empleado = {
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
    this.empleado.nombre_paterno = this.updateEmpleado.nombre_paterno;
    this.empleado.nombre_materno = this.updateEmpleado.nombre_materno;
    this.empleado.apellido_paterno = this.updateEmpleado.apellido_paterno;
    this.empleado.apellido_materno = this.updateEmpleado.apellido_materno;
    this.empleado.rut = this.updateEmpleado.rut;
  }

  editPrimerNombre(){
    this.boolPrimerNombre = !this.boolPrimerNombre;
  }

  editSegundoNombre(){
    this.boolSegundoNombre = !this.boolSegundoNombre;
  }

  editPrimerApellido(){
    this.boolPrimerApellido = !this.boolPrimerApellido
  }
  editSegundoApellido(){
    this.boolSegundoApellido = !this.boolSegundoApellido
  }

  modificar(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Estas modificando los datos del empleado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero modificarlo!'
    }).then((result)=>{
      if(result.isConfirmed){
        this.empleadoService.ModificarEmpleado(this.empleado).subscribe(
          response => {
            Swal.fire(
              '¡Modificado!',
              response.msg,
              'success'
            )
            this.recargaEmpleadoPagina.emit();
            this.empleadoService.modalUpdateEmpleadoVisible = !this.empleadoService.modalUpdateEmpleadoVisible
          }, error => {
            console.error(error)
          }
        )
      }
    })
  }

  cerrar(): void{
    this.empleadoService.modalUpdateEmpleadoVisible = !this.empleadoService.modalUpdateEmpleadoVisible 
  }

}

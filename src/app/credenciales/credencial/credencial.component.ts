import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { AllempleadosService } from 'src/app/services/allempleados.service';
import Swal from 'sweetalert2';
import { Credencial } from '../../empleados';

@Component({
  selector: 'app-credencial',
  templateUrl: './credencial.component.html',
  styleUrls: ['./credencial.component.css']
})
export class CredencialComponent implements OnInit {

  // Variables recibidas por el componente [all-empleados]
  @Input() empleadoCredencial: Credencial[];
  @Input() cantidadCredenciales: number;
  @Input() rutEmpleado: string;
  
  // Variables emitidas al componente [all-empleados]
  @Output() reload  = new EventEmitter();
  @Output() renovar = new EventEmitter();
  @Output() recargarCredencial = new EventEmitter();

  public rutEmpleadoAdd:  string

  public credencialSeleccionado: Credencial;

  constructor(
    public empleadoService: AllempleadosService
  ){
  }


  ngOnInit(): void {
    this.rutEmpleadoAdd = this.rutEmpleado
  }

  recargarPaginaCredencial(){
    this.recargarCredencial.emit();
  }

  agregarCredencial(){
    this.empleadoService.modalAddCredencialVisible = !this.empleadoService.modalAddCredencialVisible;
  }

  renovarCredencial(credencial: Credencial){
    this.credencialSeleccionado = credencial;
    this.empleadoService.modalUpdateCredencialVisible = !this.empleadoService.modalUpdateCredencialVisible;
  }

  eliminarCredencial(credencial: Credencial){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Estas eliminando la credencial de " + credencial.tipo + " del sistema",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.EliminarCredencial(credencial).subscribe(
          response => {
            Swal.fire(
              'Eliminado!',
              response.msg,
              'success'
            )
            this.recargarCredencial.emit();
            this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible
          },
          error => {
            console.error(error)
          }
        )
      }
    })
  }
  
  cerrarCredencial(){
    this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible;
  }
}

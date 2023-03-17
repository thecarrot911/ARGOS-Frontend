import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Credencial, Empleado } from '../../empleados';
import { AllempleadosService } from '../../services/allempleados.service';
import Swal from 'sweetalert2';

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

  // Variables recibidas por el componente [all-empleados]
  @Input() rut: string;
  // Variables emitidas al componente [all-empleados]
  @Output() recargaPagina = new EventEmitter();

  
  public numero: string;

  // Formulario agregar credencial
  credencial: Credencial = {
    tipo: '',
    numero: 0,
    empleado_rut: '',
    fecha_vencimiento: '',
    fecha_emision: ''
  }

  ngOnInit(): void {
  }

  CrearCredencial(){
    this.credencial.empleado_rut = this.rut;
    this.credencial.numero = Number(this.numero);
    this.empleadoService.RegistrarCredencial(this.credencial).subscribe(
      response=>{
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
        this.empleadoService.modalAddCredencialVisible = !this.empleadoService.modalAddCredencialVisible;
        this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible;
        this.recargaPagina.emit();

      },error =>{
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: error
        })
        console.error(error);
      }
    )
  }
  
  cerrar(){
    this.empleadoService.modalAddCredencialVisible = !this.empleadoService.modalAddCredencialVisible
    this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible
  }
}

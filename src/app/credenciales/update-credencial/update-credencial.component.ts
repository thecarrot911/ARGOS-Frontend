import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { er } from '@fullcalendar/core/internal-common';
import { response } from 'express';
import { Credencial } from 'src/app/empleados';
import { AllempleadosService } from 'src/app/services/allempleados.service';
import { RenovarCredencial } from 'src/app/updateEmpleado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-credencial',
  templateUrl: './update-credencial.component.html',
  styleUrls: ['./update-credencial.component.css']
})
export class UpdateCredencialComponent implements OnInit {
  
  // Variables recibidas por el componente [credencial]
  @Input() renovarCredencial: Credencial;

  @Output() recargaCredencial = new EventEmitter()

  // Variable boleanas de Credencial
  public boolFormRenovar: boolean = true;


  public credencial: Credencial = {
    fecha_emision: '',
    fecha_vencimiento: '',
    tipo: '',
    numero: 0,
    empleado_rut: '',
    credencial_id: 0
  }


  constructor(
    public empleadoService: AllempleadosService
  ) { }

  @Input() credencialEmpleado : Credencial;

  ngOnInit(): void {
    this.credencial.fecha_emision = this.renovarCredencial.fecha_emision;
    this.credencial.fecha_vencimiento = this.renovarCredencial.fecha_vencimiento;
    this.credencial.tipo = this.renovarCredencial.tipo;
    this.credencial.numero = this.renovarCredencial.numero;
    this.credencial.empleado_rut = this.renovarCredencial.empleado_rut;
    this.credencial.credencial_id = this.renovarCredencial.credencial_id
  }

  editar(){
    this.boolFormRenovar = !this.boolFormRenovar;
  }

  renovar(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Estas renovando la credencial",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡quiero renovarla!'
    }).then((result)=>{
      if(result.isConfirmed){
        this.empleadoService.RenovarCredencial(this.credencial).subscribe(
          response =>{
            this.empleadoService.modalUpdateCredencialVisible = !this.empleadoService.modalUpdateCredencialVisible
            this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible;
            this.recargaCredencial.emit();
            this.empleadoService.ejecutarFuncion();
            if (response.error) {
              Swal.fire({
                icon: 'error',
                title: 'Ha ocurrido un error',
                text: response.msg
              })
            } else {
              Swal.fire({
                icon: 'success',
                title: response.msg,
                showConfirmButton: false,
                timer: 1500
              })
            }
          },error=>{
            Swal.fire({
              icon: 'error',
              title: 'Ha ocurrido un error',
              text: error
            })
            console.error(error)
          }
        )
      }
    })
  }

  cerrar(){
    this.empleadoService.modalUpdateCredencialVisible = !this.empleadoService.modalUpdateCredencialVisible
    this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible
  }
}

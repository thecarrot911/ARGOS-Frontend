import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Credencial } from '../empleados';
import { AllempleadosService } from '../services/allempleados.service';

@Component({
  selector: 'app-credencial',
  templateUrl: './credencial.component.html',
  styleUrls: ['./credencial.component.css']
})
export class CredencialComponent implements OnInit {

  // Variables recibidas por el componente [all-empleados]
  @Input() empleadoCredencial: Credencial[];
  @Input() cantidadCredenciales: number;
  // Variables emitidas al componente [all-empleados]

  // Variables a mostrar en HTML [Credencial]
  public modalCredencial = document.getElementById('modal_credencial');

  constructor(
    public empleadoService: AllempleadosService
  ){
  }

  ngOnInit(): void {
    console.log("credencial.component")
    console.log(this.empleadoCredencial)
    console.log(this.cantidadCredenciales)
  }
  renovarCredencial(){

  }
  eliminarCredencial(){

  }
  cerrarCredencial(){
    this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible;
  }
}

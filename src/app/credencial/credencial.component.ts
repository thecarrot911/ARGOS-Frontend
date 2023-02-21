import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { AllempleadosService } from '../services/allempleados.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Perfil, Credencial } from '../empleados';

@Component({
  selector: 'app-credencial',
  templateUrl: './credencial.component.html',
  styleUrls: ['./credencial.component.css']
})
export class CredencialComponent implements OnInit {

  // Variables recibidas por el componente [all-empleados]
  //@Input() empleadoCredencial: Credencial[] = [];
  @Input() cantidadCredenciales: number;
  @Input() modalCredencial: any;
  @Input() credencialEmpleado: Credencial[];
  
  // Variables emitidas al componente [all-empleados]
  @Output() outputEliminarCredencial = new EventEmitter();

  // Variables a mostrar en HTML [Credencial]
  public empleadoCredencial: Credencial[];

  constructor(
    private empleadoService: AllempleadosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarCredencial();
  }

  cargarCredencial(){
    console.log("cargar Credencial")
    this.empleadoCredencial = this.credencialEmpleado;
  }
  
  cerrarCredencial(){
    this.modalCredencial.classList.add('hidden');
    console.log("cerrar")
    console.log();
  }
  
  renovarCredencial(){

  }
  
  eliminarCredencial(credencial: Credencial){
    this.outputEliminarCredencial.emit({
      credencial: credencial
    });
  }
}

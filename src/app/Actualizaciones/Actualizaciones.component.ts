import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { AgregarActualizacionComponent } from '../agregarActualizacion/agregarActualizacion.component';
import { Actualizacion } from '../actualizacion';

@Component({
  selector: 'app-Actualizaciones',
  templateUrl: './Actualizaciones.component.html',
  styleUrls: ['./Actualizaciones.component.css']
})
export class ActualizacionesComponent implements OnInit {

    actualizaciones: Actualizacion[] = [];
  public actualizacion: Actualizacion;
  
  constructor(
    private horarioService: HorarioService
  ) {
    this.actualizacion = new Actualizacion('','','', '', 0);
  }

  ngOnInit(): void {

  }

}

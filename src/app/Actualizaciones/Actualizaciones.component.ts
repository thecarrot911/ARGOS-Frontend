import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { AgregarActualizacionComponent } from '../agregarActualizacion/agregarActualizacion.component';
import { AddActualizacion } from '../actualizacion';

@Component({
  selector: 'app-Actualizaciones',
  templateUrl: './Actualizaciones.component.html',
  styleUrls: ['./Actualizaciones.component.css']
})
export class ActualizacionesComponent implements OnInit {

    actualizaciones: AddActualizacion[] = [];
  public actualizacion: AddActualizacion;
  
  constructor(
    private horarioService: HorarioService
  ) {
    this.actualizacion = new AddActualizacion('','','', '', 0);
  }

  ngOnInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-itinerario-aviones',
  templateUrl: './itinerario-aviones.component.html',
  styleUrls: ['./itinerario-aviones.component.css']
})
export class ItinerarioAvionesComponent implements OnInit {

  public generadorItinerario: any; /*  */
  public info: any; /*  */

  constructor(
    private horarioService: HorarioService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    this.generadorItinerario={

      fecha: '',
      horario_llegada: '',
      horario_salida: '',
      linea_aerea: '',
      tipo_avion: '',
      destino: '',
    }

    this.info={
      anio: '',
      mes: '',
      empleado_1: '',
      empleado_2: '',
      empleado_3: '',
      empleado_4: '',
      empleado_5: '',
    }
   }

  ngOnInit() {
  }

  generarHorario(){
    this.horarioService.genHorario(this.generadorItinerario)
      .subscribe(
        response => {
          console.log(response)
        },
        error => {
          console.log(error)
        }
      )
  }

  /* Empleados, mes, año */
  generarInfo(){
    this.horarioService.genInfo(this.info)
      .subscribe(
        response => {
          console.log(response)
        },
        error => {
          console.log(error)
        }
      )
  }

}

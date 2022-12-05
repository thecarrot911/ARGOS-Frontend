import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

export interface Tiempo {
  anio: string;
  mes: string;
  empleados: Empleado[];
  itinerario: Turno_Choque[];
}

interface Empleado {
  nombre: string;
}

interface Turno_Choque{
  dia: string;
  turno: string;
  aviones: string;
}


/* Prueba */

interface Persona {
  nombre: string;
  favoritos: Favorito []
}

interface Favorito {
  id: number;
  nombre: string;
}







/* Prueba */

@Component({
  selector: 'app-itinerario-aviones',
  templateUrl: './itinerario-aviones.component.html',
  styleUrls: ['./itinerario-aviones.component.css']
})
export class ItinerarioAvionesComponent implements OnInit {

  public ayuda: any;
  /* Cap 245 */
  tiempo: Tiempo = {
    anio: '2022',
    mes: '',
    empleados: [
      { nombre: 'A. MONTANER' },
      { nombre: 'C. VEIRA' },
      { nombre: 'D. TRONCOSO' },
      { nombre: 'R. ZAVALA' },
      { nombre: 'R. ZUÑIGA' }
    ],
    itinerario: [
      { dia: '', turno: '', aviones: '' }
    ]
  }

  /* PRUEBA */
  persona: Persona = {
    nombre: 'Javier',
    favoritos: [
      { id: 1, nombre: 'Metal Gear Solid' },
      { id: 2, nombre: 'Twisted Metal' },
    ]
  }

  nuevoChoque: string = '';


  constructor(
    private horarioService: HorarioService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private formsMOdule: FormsModule,
  ) {
   }

  ngOnInit() {
  }

  enviarDatosJSON(){
    console.log('Formulario posteado')
    console.log(this.tiempo)
    this.horarioService.generarHorario(this.tiempo)
    .subscribe(
      response => {
        console.log('abajo response XD')
        console.log(response)
      
      },
      error => {
        console.log('ERROR -->')
        console.log(error)
      }
    )
  }

  agregarChoque(){
    const newChoque: Turno_Choque = {
      dia: this.tiempo.itinerario[0].dia,
      aviones: this.tiempo.itinerario[0].aviones,
      turno: this.tiempo.itinerario[0].turno
    }
    this.tiempo.itinerario.push({ ...newChoque});
    console.log(newChoque)
    this.tiempo.itinerario[0].dia = '';
  }

}

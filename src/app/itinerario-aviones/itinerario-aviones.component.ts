import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendario } from '../calendario';
import { PlanificacionData } from '../tiempo';

import Swal from 'sweetalert2';

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
  id: number;
}

@Component({
  selector: 'app-itinerario-aviones',
  templateUrl: './itinerario-aviones.component.html',
  styleUrls: ['./itinerario-aviones.component.css'],
})
export class ItinerarioAvionesComponent implements OnInit {

  public ayuda: any;
  /* Cap 245 */

  nuevoItinerario: string = '';

  tiempo: Tiempo = {
    anio: '',
    mes: '',
    empleados: [
      { nombre: 'A. MONTANER' },
      { nombre: 'C. VEIRA' },
      { nombre: 'D. TRONCOSO' },
      { nombre: 'R. ZAVALA' },
      { nombre: 'R. ZUÑIGA' }
    ],
    itinerario: [
      { dia: '', turno: '', aviones: '', id: 1}
    ]
  }

  nuevoChoque: string = '';
  public loading = document.getElementById('loading');
  constructor(
    private horarioService: HorarioService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private formsModule: FormsModule,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
   }

  itinerarioForm= new FormGroup({
    /* PONER NOMBRE y agrupar */
      anio: new FormControl('',[Validators.required, this.noPermitirEspacios]),
      mes: new FormControl('',[Validators.required, this.noPermitirEspacios]),
      empleados_nombre: new FormControl('',[Validators.required]),
    turno_choque_dia: new FormControl('',[Validators.required]),
    turno_choque_aviones: new FormControl('',[Validators.required]),
    turno_choque_turno: new FormControl('',[Validators.required]),
  })

  get anio(){
    return this.itinerarioForm.get('anio')
  }
  get mes(){
    return this.itinerarioForm.get('mes')
  }

  get turno_choque_dia(){
    return this.itinerarioForm.get('turno_choque_dia')
  }
  get turno_choque_aviones(){
    return this.itinerarioForm.get('turno_choque_aviones')
  }
  get turno_choque_turno(){
    return this.itinerarioForm.get('turno_choque_turno')
  }

  noPermitirEspacios(control: FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1){
      return {noPermitirEspacios: true}
    }
    return null;
  }





  ngOnInit() {
  }



  esperandoJSON(){
    this.loading = document.getElementById('loading');
    if(this.loading != null){
      this.loading.classList.remove('hidden')
    }
  }

  enviarDatosJSON(){
    this.esperandoJSON();
    this.horarioService.generarHorario(this.tiempo)
    .subscribe(
      response => {
        if(response.error){
          console.log(response.msg)
          console.log('hay error')
          this.loading.classList.add('hidden')
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.msg
          })
        }
        else{
          console.log('no hay error')
          this.router.navigate(['/schedule'])
        }

      },
      error => {
        console.log(error)
      }
    )
  }

  agregarChoque(){
    
    const newChoque: Turno_Choque = {

      dia: this.tiempo.itinerario[0].dia,
      aviones: this.tiempo.itinerario[0].aviones,
      turno: this.tiempo.itinerario[0].turno,
      id: this.tiempo.itinerario.length + 1
    }

    if(this.tiempo.itinerario[0].dia != '' && this.tiempo.itinerario[0].dia != null && this.tiempo.itinerario[0].aviones != '' && this.tiempo.itinerario[0].aviones != null && this.tiempo.itinerario[0].turno != ''){
    
      this.tiempo.itinerario.push({ ...newChoque});
      console.log(newChoque)
      this.tiempo.itinerario[0].dia = '';
      this.tiempo.itinerario[0].aviones = '';
      this.tiempo.itinerario[0].turno = '';
    
    

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Itinerario registrado exitosamente'
    })
  }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes rellenar los datos!',
      })
    }
  }

  eliminarItinerario(index: number ){
    this.tiempo.itinerario.splice(index, 1);
    this.router.navigate(['/itinerario-aviones'])
  }


}

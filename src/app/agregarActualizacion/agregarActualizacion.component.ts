import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { Actualizacion } from '../actualizacion';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregarActualizacion',
  templateUrl: './agregarActualizacion.component.html',
  styleUrls: ['./agregarActualizacion.component.css'],
  providers: [HorarioService]

})
export class AgregarActualizacionComponent implements OnInit {

  actualizaciones: Actualizacion[] = [];
  actualizacion: Actualizacion;
  public status!: string;

  constructor(
    private horarioService: HorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { 
    this.actualizacion = new Actualizacion('','','',null);
  }

  ngOnInit(): void {
  }


  enviarActualizacion(){
    this.horarioService.guardarActualizacion(this.actualizacion)
      .subscribe(
       response => {
         console.log(response)
       },
       error => {
         console.log(error)
       }
      )
   }

   addActualizacionVista(tipo_permiso: string): void{
    tipo_permiso = tipo_permiso.trim();
    console.log('addActualizacion')
    this.horarioService.addActualizacionVista({tipo_permiso} as Actualizacion)
      .subscribe(actualizacion => {
        this.actualizaciones.push(actualizacion);
      });
   }

}
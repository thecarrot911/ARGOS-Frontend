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

  public actualizacion: Actualizacion;
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

  ngOnInit() {
  }

  onSubmit(){
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

}
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HorarioService } from '../services/horario.service';

@Component({
  selector: 'app-agregarActualizacion',
  templateUrl: './agregarActualizacion.component.html',
  styleUrls: ['./agregarActualizacion.component.css']
})
export class AgregarActualizacionComponent implements OnInit {

  formactualizaciones: any;

  constructor(
    private horarioService: HorarioService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { 
    this.formactualizaciones = this.formBuilder.group({
      tipo_permiso: '',
      trabajador: '',
      descripcion: '',
    })
  }

  ngOnInit() {
  }

}

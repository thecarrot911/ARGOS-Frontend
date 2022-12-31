import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HorarioService } from '../services/horario.service';
import { AddActualizacion } from '../Addactualizacion';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Calendario, Actualizacion, Itinerario } from '../calendario';
import { UpdateActualizacion } from '../updateActualizacion';

@Component({
  selector: 'app-editarActualizacion',
  templateUrl: './editarActualizacion.component.html',
  styleUrls: ['./editarActualizacion.component.css']
})
export class EditarActualizacionComponent implements OnInit {

  public planificacion_id! : number;
  public sub!: any;
  public subActualizacion_id!: any;
  public actualizacion_id!: number;
  public is_edit: boolean;
  public titulo_pagina: string;

  actualizaciones: AddActualizacion[] = [];
  actualizacion!: AddActualizacion;
  public status!: string;
  actualizacion_calendario!: UpdateActualizacion;

  CurrentDate = new Date();
  latest_date = this.datePipe.transform(this.CurrentDate, 'yyyy-MM-dd');


  constructor(
    private horarioService: HorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.titulo_pagina = 'Editar Actualización'
  }

  actualizacionForm = new FormGroup({
    tipo_permiso: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required]),
    empleado: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
  })

  get tipo_permiso(){
    return this.actualizacionForm.get('tipo_permiso')
  }

  get empleado(){
    return this.actualizacionForm.get('empleado')
  }

  get descripcion(){
    return this.actualizacionForm.get('descripcion')
  }

  get fecha(){
    return this.actualizacionForm.get('fecha')
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.planificacion_id = params['planificacion_id'];
      });

      this.subActualizacion_id = this.route.params.subscribe(params => {
        this.actualizacion_id = params['actualizacion_id'];
        });

    this.actualizacion = new AddActualizacion('','','',this.latest_date, this.planificacion_id);
    this.actualizacion_calendario = new UpdateActualizacion(this.actualizacion_id, this.actualizacion.tipo_permiso, this.actualizacion.descripcion, this.actualizacion.empleado, this.actualizacion.fecha, this.planificacion_id);
  }


  enviarActualizacion(){
      this.horarioService.updateActualizacionId(this.actualizacion_calendario)
      .subscribe(
       response => {
         console.log(response)
         this.router.navigate(['/schedule'])
       },
       error => {
         console.log(error)
       }
      )
   }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { AddActualizacion } from '../Addactualizacion';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Calendario, Data, Planificacion, Actualizacion, Empleados} from '../calendario';


@Component({
  selector: 'app-agregarActualizacion',
  templateUrl: './agregarActualizacion.component.html',
  styleUrls: ['./agregarActualizacion.component.css'],
  providers: [HorarioService]
})


export class AgregarActualizacionComponent implements OnInit {

  horarios: Calendario;
  horariosData: Data;
  horariosPlanificacion: Planificacion[] = [];
  horariosActualizacion: Actualizacion[] = [];
  horariosEmpleados: Empleados[] = [];

  planificacion_id! : number;
  sub!: any;

  titulo_pagina: string;

  actualizacion: AddActualizacion;

  CurrentDate = new Date();
  latest_date = this.datePipe.transform(this.CurrentDate, 'yyyy-MM-dd');

  constructor(
    private horarioService: HorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe
  ) { 
      this.titulo_pagina = 'Agregar Actualización'; 
  }

  actualizacionForm = new FormGroup({
    tipo_permiso: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required]),
    empleado: new FormControl('', [Validators.required]),
    fecha: new FormControl(''),
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
      this.cargarData();
      this.sub = this.route.params.subscribe(params => {
      this.planificacion_id = params['planificacion_id'];
      });
    this.actualizacion = new AddActualizacion('','','',this.latest_date, this.planificacion_id);
  }

  enviarActualizacion(){
    this.horarioService.guardarActualizacion(this.actualizacion)
      .subscribe(
       response => {
         console.log(response.fecha)
         this.router.navigate(['/schedule'])
       },
       error => {
         console.log(error)
       }
      )
   }

   cargarData(): void {
    this.horarioService.getHorarios()
      .subscribe(
        response => {
          //this.horarios = response;
          this.horariosData = this.horarios.data
          this.horariosPlanificacion = this.horariosData.planificacion;
          this.horariosActualizacion = this.horariosData.actualizacion;
          this.horariosEmpleados = this.horariosPlanificacion[0].empleados;
          console.log(this.horarios)
          console.log(this.horariosEmpleados)

          this.planificacion_id = this.horarios.data.planificacion_id;     
        },
        error => {
          console.log(error)
        }
      )
  }
   

}
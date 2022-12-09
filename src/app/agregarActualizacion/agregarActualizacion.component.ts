import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { AddActualizacion } from '../actualizacion';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-agregarActualizacion',
  templateUrl: './agregarActualizacion.component.html',
  styleUrls: ['./agregarActualizacion.component.css'],
  providers: [HorarioService]

})
export class AgregarActualizacionComponent implements OnInit {

  public planificacion_id! : number;
  public sub!: any;

  actualizaciones: AddActualizacion[] = [];
  actualizacion!: AddActualizacion;
  public status!: string;

  constructor(
    private horarioService: HorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private datePipe: DatePipe
  ) { 
    
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
    this.actualizacion = new AddActualizacion('','','',this.latest_date, this.planificacion_id);
  }

  CurrentDate = new Date();
  latest_date = this.datePipe.transform(this.CurrentDate, 'yyyy-MM-dd');


  enviarActualizacion(){
    this.horarioService.guardarActualizacion(this.actualizacion)
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
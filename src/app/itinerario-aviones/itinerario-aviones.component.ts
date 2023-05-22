import { Component, NgModule, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllempleadosService } from '../services/allempleados.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from '../empleados';
import { GenerarPlanificacion, Turno, Turno_Choque } from '../generarPlanificacion';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-itinerario-aviones',
  templateUrl: './itinerario-aviones.component.html',
  styleUrls: ['./itinerario-aviones.component.css'],
})

export class ItinerarioAvionesComponent implements OnInit {

    planificacion: GenerarPlanificacion = {
        anio: null,
        mes: null,
        empleados: [],
        itinerario: [],
        comodin: null,
        turnos: {
            turno1: '07:00 a 15:00',
            turno2: '15:00 a 23:00',
            turno3: '23:00 a 07:00'
        }
    }

    public listaEmpleados: Empleado[];
    public empleadoSeleccionado: Empleado[] = [];
    public empleadosPlanificacion: Empleado[] = [];
    
    public comodinSeleccionado: Empleado = null;

    public ngEmpleado: string;
    public comodin: string = "";

    nuevoEncuentro: Turno_Choque = {
        dia: null,
        aviones: null,
        turno: null,
        id: null
    };

    public anioActual = new Date().getFullYear();
    public mesActual = new Date().getMonth();
    public diaActual = new Date().getDay()

    public efectoCarga: boolean = false;
    public boolItinerario: boolean = false

    constructor(
        private horarioService: HorarioService,
        private router: Router,
        private empleadoService: AllempleadosService,
    ) {
    }

    ngOnInit() {
        this.empleadoService.MostrarEmpleados().subscribe(
            response => {
                this.listaEmpleados = response.data
                for(const empleado of this.listaEmpleados){
                    empleado.mostrar = true;
                }
            }, error =>{
                console.error(error)
            }
        )
    }

    FormularioItinerario(){
        this.boolItinerario = !this.boolItinerario
    }

    AgregarComodin(){
        if(this.comodinSeleccionado!=null){
            this.EliminarComodin(this.comodinSeleccionado)
        }
        let empleado = this.listaEmpleados.find((e) => e.rut === this.comodin)
        this.comodinSeleccionado = empleado
        this.planificacion.comodin = empleado
        this.listaEmpleados.forEach(emp =>{
            if(emp.rut == this.comodinSeleccionado.rut){
                emp.mostrar = false;
            }else emp.mostrar = true;
        });
    }

    AgregarEmpleado(){
        const empleado = this.listaEmpleados.find((e) => e.rut === this.ngEmpleado);
        this.empleadoSeleccionado.push(empleado);
        this.planificacion.empleados.push(empleado);
        this.listaEmpleados = this.listaEmpleados.filter(empleado => empleado.rut != this.ngEmpleado);
    }

    EliminarEmpleado(empleado: Empleado){
        this.listaEmpleados.push(empleado);
        this.empleadoSeleccionado = this.empleadoSeleccionado.filter(emp => emp.rut != empleado.rut);
        this.planificacion.empleados = this.planificacion.empleados.filter(emp => emp.rut !=  empleado.rut)
    }

    EliminarComodin(empleado: Empleado){
        for(const emp of this.listaEmpleados){
            if(emp.rut == empleado.rut){
                emp.mostrar = true;
            }
        }
        this.comodinSeleccionado = null;
        this.planificacion.comodin = null;
    }


    itinerarioForm= new FormGroup({
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

    GenerarPlanificacion(){
        this.efectoCarga = true;
        console.log(this.planificacion);
        /*
        this.horarioService.generarHorario(this.planificacion)
        .pipe(
            finalize(()=>{
                this.efectoCarga = false;
            })
        ).subscribe(
            response => {
                console.log(response)
                this.router.navigate(['/allschedules']);
            },
            error => {
                console.error(error)
            }
        );
        */
    }

    agregarEncuentro() {
        if (this.nuevoEncuentro.dia != null && this.nuevoEncuentro.aviones != null && this.nuevoEncuentro.turno != null) {
            this.planificacion.itinerario.push({
                dia: this.nuevoEncuentro.dia,
                aviones: this.nuevoEncuentro.aviones,
                turno: this.nuevoEncuentro.turno,
                id: this.planificacion.itinerario.length + 1
            });

            this.nuevoEncuentro = {
                dia: null,
                aviones: null,
                turno: null,
                id: null
            }
        }
    }

    eliminarItinerario(id: number ){
        this.planificacion.itinerario = this.planificacion.itinerario.filter( itinerario => itinerario.id != id)
    }

}

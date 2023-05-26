import { Component, NgModule, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { AllempleadosService } from '../services/allempleados.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado, ListaEmpleados } from '../empleados';
import { GenerarPlanificacion, Turno, Turno_Choque } from '../generarPlanificacion';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-itinerario-aviones',
  templateUrl: './itinerario-aviones.component.html',
  styleUrls: ['./itinerario-aviones.component.css'],
})

export class ItinerarioAvionesComponent implements OnInit {

    planificacion: GenerarPlanificacion = {
        anio: '',
        mes: '',
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
    public boolItinerario: boolean = false;

    public patronNumero = /^(1[0-2]|[1-9])$/;
    

    constructor(
        private horarioService: HorarioService,
        private router: Router,
        private empleadoService: AllempleadosService
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

    public validateAnio = false;
    ValidarAnio(){
        if(this.planificacion.anio != null){
            if(parseInt(this.planificacion.anio)<=3000 && parseInt(this.planificacion.anio)>=2000){
                this.validateAnio = true
            }
            else this.validateAnio = false;
        }
    }

    public validateMes = false;
    ValidarMes(){
        if(this.planificacion.mes != null){
            switch (parseInt(this.planificacion.mes)){
                case 1: this.validateMes = true; break;
                case 2: this.validateMes = true; break;
                case 3: this.validateMes = true; break;
                case 4: this.validateMes = true; break;
                case 5: this.validateMes = true; break;
                case 6: this.validateMes = true; break;
                case 7: this.validateMes = true; break;
                case 8: this.validateMes = true; break;
                case 9: this.validateMes = true; break;
                case 10: this.validateMes = true; break; 
                case 11: this.validateMes = true; break;
                case 12: this.validateMes = true; break;
                default: this.validateMes = false; break;
            }
        }
    }

    public validateComodin = false;

    FormularioItinerario(){
        this.boolItinerario = !this.boolItinerario
    }

    AgregarComodin(){
        if(this.comodinSeleccionado!=null){
            this.EliminarComodin(this.comodinSeleccionado)
            this.validateComodin = false;
        }
        let empleado = this.listaEmpleados.find((e) => e.rut === this.comodin)
        this.comodinSeleccionado = empleado
        this.planificacion.comodin = empleado
        this.listaEmpleados.forEach(emp =>{
            if(emp.rut == this.comodinSeleccionado.rut){
                emp.mostrar = false;
            }else emp.mostrar = true;
        });
        this.validateComodin = true;
    }

    public ValidarEmpleado = false;
    AgregarEmpleado(){
        const empleado = this.listaEmpleados.find((e) => e.rut === this.ngEmpleado);
        this.empleadoSeleccionado.push(empleado);
        this.planificacion.empleados.push(empleado);
        this.listaEmpleados = this.listaEmpleados.filter(empleado => empleado.rut != this.ngEmpleado);
        if (this.planificacion.empleados.length == 5){
            this.ValidarEmpleado = true
        }else{
            this.ValidarEmpleado = false;
        }
    }

    EliminarEmpleado(empleado: Empleado){
        this.listaEmpleados.push(empleado);
        this.empleadoSeleccionado = this.empleadoSeleccionado.filter(emp => emp.rut != empleado.rut);
        this.planificacion.empleados = this.planificacion.empleados.filter(emp => emp.rut !=  empleado.rut)
        if (this.planificacion.empleados.length == 5){
            this.ValidarEmpleado = true
        }else{
            this.ValidarEmpleado = false;
        }
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

    GenerarPlanificacion(){
        if(this.validateAnio && this.validateMes && this.validateComodin && this.ValidarEmpleado){
            this.efectoCarga = true;
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
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Complete el formulario',
                showConfirmButton: false,
                timer: 1500
            })
        }
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

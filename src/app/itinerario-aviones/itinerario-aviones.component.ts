import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllempleadosService } from '../services/allempleados.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from '../empleados';
import { GenerarPlanificacion, Turno_Choque } from '../generarPlanificacion';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-itinerario-aviones',
  templateUrl: './itinerario-aviones.component.html',
  styleUrls: ['./itinerario-aviones.component.css'],
})
export class ItinerarioAvionesComponent implements OnInit {

    public ayuda: any;

    nuevoItinerario: string = '';

    planificacion: GenerarPlanificacion = {
        anio: null,
        mes: null,
        empleados: [],
        itinerario: [
        { dia: null, turno: null, aviones: null, id: 1}
        ]
    }

    nuevoChoque: string = '';
    public loading = document.getElementById('loading');

    public listaEmpleados: Empleado[];
    public empleadoSeleccionado: Empleado[] = [];
    public empleadosPlanificacion: Empleado[] = [];
    
    public comodinSeleccionado: Empleado = null;

    public ngEmpleado: string;
    public comodin: string;
    

    public anioActual = new Date().getFullYear();
    public mesActual = new Date().getMonth();

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
            }, error =>{
                console.error(error)
            }
        )
    }

    AgregarComodin(){
        if(this.comodinSeleccionado!=null){
            this.EliminarComodin(this.comodinSeleccionado)
        }
        const empleado = this.listaEmpleados.find((e) => e.rut === this.comodin)
        this.comodinSeleccionado = empleado
        this.listaEmpleados = this.listaEmpleados.filter(empleado => empleado.rut != this.comodinSeleccionado.rut);
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
        this.listaEmpleados.push(empleado);
        this.comodinSeleccionado = null;
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

    esperandoJSON(){
        this.loading = document.getElementById('loading');
        if(this.loading != null){
            this.loading.classList.remove('hidden')
        }
    }

    Cerrar(){
        this.horarioService.modalAddPlanificacion = !this.horarioService.modalAddPlanificacion;
    }

    GenerarPlanificacion(){
        /*this.esperandoJSON();

        if (this.planificacion.itinerario[0]["dia"] == null){
            this.planificacion.itinerario = []
        }

        this.horarioService.generarHorario(this.planificacion).subscribe(
            response => {
                this.router.navigate(['schedule'])
            },
            error => {
                console.error(error)
            }
        )*/
        console.log("xsadasd?")
    }

    agregarChoque(){
        
        const newChoque: Turno_Choque = {
            dia: this.planificacion.itinerario[0].dia,
            aviones: this.planificacion.itinerario[0].aviones,
            turno: this.planificacion.itinerario[0].turno,
            id: this.planificacion.itinerario.length + 1
        }

        if(this.planificacion.itinerario[0].dia != null && this.planificacion.itinerario[0].dia != null && this.planificacion.itinerario[0].aviones != null && this.planificacion.itinerario[0].aviones != null && this.planificacion.itinerario[0].turno != null){
        
        this.planificacion.itinerario.push({ ...newChoque});
        this.planificacion.itinerario[0].dia = null;
        this.planificacion.itinerario[0].aviones = null;
        this.planificacion.itinerario[0].turno = null;

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
        this.planificacion.itinerario.splice(index, 1);
        this.router.navigate(['/itinerario-aviones'])
    }

}

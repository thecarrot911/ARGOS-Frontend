import { Component, OnInit, Type, Input, EventEmitter, Output } from '@angular/core';
import { Empleado } from '../../empleados';
import { HorarioService } from '../../services/horario.service';
import { ActualizacionService } from '../../services/actualizacion.service';
import { Tipo, Actualizacion } from '../../actualizacion';
import { Planificacion } from 'src/app/UltimaPlanificacion';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-agregarActualizacion',
    templateUrl: './agregarActualizacion.component.html',
    styleUrls: ['./agregarActualizacion.component.css']
})


export class AgregarActualizacionComponent implements OnInit {


    // Variable que recibe de schedule 
    @Input() planificacion_id: number;
    @Input() diasPlanificacion: Planificacion;

    // Se emite el evento para reiniciar el component schedule
    @Output() recargarPagina = new EventEmitter();

    public ArrayEmpleadoSolicitante: Empleado[];
    public ArrayEmpleadoReemplazante: Empleado[];

    public ArrayTipo: Tipo[];

    fecha = new Date();
    anio = this.fecha.getFullYear();
    mes = this.fecha.getMonth() + 1; // Los meses se indexan desde 0, por lo que se suma 1
    dia = this.fecha.getDate();

    FormatoFecha = `${this.anio}-${this.mes}-${this.dia}`;

    public meses: any = {
        "Enero": '01',"Febrero": '02',"Marzo": '03',"Abril": '04',"Mayo": '05',"Junio": '06',
        "Julio": '07',"Agosto": '08',"Septiembre": '09',"Octubre": '10',"Noviembre": '11',"Diciembre": '12'
    };

    fechaMin: string;
    fechaMax: string;

    constructor(
        private horarioService: HorarioService,
        private actualizacionService: ActualizacionService,
        private datePipe: DatePipe
    ) {
    }

    ngOnInit(): void {
        const mes = this.meses[this.diasPlanificacion.mes]
        const year = new Date().getFullYear();
        
        this.fechaMin = `${year}-${mes}-01`
        this.fechaMax = `${year}-${mes}-${this.UltimoDiaDelMes(mes,year)}`

        this.actualizacionService.MostrarFormulario(this.planificacion_id).subscribe(
            response =>{
                this.ArrayTipo = response.data.actualizacion
                this.ArrayEmpleadoSolicitante = response.data.solicitante
                this.ArrayEmpleadoReemplazante = response.data.empleados
                console.log(this.ArrayTipo)
            },  
            error =>{
                console.error(error)
            }
        )
    }

    actualizacion: Actualizacion = {
        rut: null,
        planificacion_id: null,
        descripcion: null,
        fecha: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
        fecha_inicio: null,
        fecha_termino: null,
        tipo_id: null,
        reemplazo: null
    }
    UltimoDiaDelMes(mes:string, year: number): number{
        return new Date(year, parseInt(mes,10),0).getDate();
    }

    FiltrandoSelect(){
        this.ArrayEmpleadoReemplazante = this.ArrayEmpleadoReemplazante.filter(emp =>  emp.rut != this.actualizacion.rut)
    }
    ValidarTipoId(){
        if(this.actualizacion.tipo_id == null){
            throw new TypeError("No ha seleccionado el tipo de comentario que va crear")
        }
    }
    ValidarDescripcion(){
        if(this.actualizacion.descripcion == null || this.actualizacion.descripcion == ''){
            throw new TypeError("No ha ingresado una descripción del comentario")
        }
    }
    ValidarFechaInicio(){
        if(this.actualizacion.fecha_inicio == null){
            throw new TypeError("No ha seleccionado una fecha de inicio")
        }
    }
    ValidarFechaTermino(){
        if(this.actualizacion.fecha_termino == null){
            throw new TypeError("No ha seleccionado una fecha de termino")
        }
    }
    ValidarReemplazo(){
        if(this.actualizacion.reemplazo == null){
            throw new TypeError("No ha seleccionado el empleado que va reemplazar")
        }
    }
    ValidarReemplazoObservacion() {
        if (this.actualizacion.reemplazo == null) {
            throw new TypeError("No ha seleccionado el empleado")
        }
    }

    EnviarActualizacion(): void{
        //console.log(this.actualizacion.tipo_id)
        try{
            this.ValidarTipoId();
            this.ValidarDescripcion();

            // Los comentarios que no sean del tipo 4, no requieren de las demas campos.
            if (this.actualizacion.tipo_id != 4){
                this.ValidarFechaInicio();
                this.ValidarFechaTermino();
                this.ValidarReemplazo();
            }else{
                this.ValidarReemplazoObservacion();
            }
            this.actualizacion.planificacion_id = this.planificacion_id;
            this.actualizacionService.RegistrarActualizacion(this.actualizacion).subscribe(
                response => {
                    this.horarioService.modalAddActualizacion = !this.horarioService.modalAddActualizacion;
                    this.recargarPagina.emit();
                },
                error => {
                    console.error(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error',
                        text: error.message
                    })
                }
            )

        }catch(error){
            console.error(error)
            Swal.fire({
                icon: 'error',
                title: 'Ha ocurrido un error',
                text: error.message
            })
        }
    }

    Cerrar(): void {
        this.horarioService.modalAddActualizacion = !this.horarioService.modalAddActualizacion
    }

}
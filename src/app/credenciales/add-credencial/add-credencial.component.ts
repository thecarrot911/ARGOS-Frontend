import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Credencial} from '../../empleados';
import { AllempleadosService } from '../../services/allempleados.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-credencial',
    templateUrl: './add-credencial.component.html',
    styleUrls: ['./add-credencial.component.css']
})
export class AddCredencialComponent implements OnInit {

constructor(
    public empleadoService: AllempleadosService
){}

    // Variables recibidas por el componente [all-empleados]
    @Input() rut: string;
    // Variables emitidas al componente [all-empleados]
    @Output() recargaPagina = new EventEmitter();

  
    public numero: string;

    // Formulario agregar credencial
    credencial: Credencial = {
        tipo: '',
        numero: 0,
        rut: '',
        fecha_vencimiento: ''
    }

    ngOnInit(): void {
    }

    ValidacionTipo(){

    }
    ValidacionNumero(){

    }
    ValidacionFechaVencimiento(){

    }


    CrearCredencial(){
        this.credencial.rut = this.rut;
        this.credencial.numero = Number(this.numero);
        this.ValidacionNumero();
        this.ValidacionTipo();
        this.ValidacionFechaVencimiento();
        try{
            this.empleadoService.RegistrarCredencial(this.credencial).subscribe(
                response => {
                    if (response.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ha ocurrido un error',
                            text: response.msg
                        })
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: response.msg,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                    this.empleadoService.modalAddCredencialVisible = !this.empleadoService.modalAddCredencialVisible;
                    this.recargaPagina.emit();

                }, error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error',
                        text: error
                    })
                    console.error(error);
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
  
    cerrar(){
        this.empleadoService.modalAddCredencialVisible = !this.empleadoService.modalAddCredencialVisible
        this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible
    }
}

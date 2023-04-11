import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';

@Component({
    selector: 'app-agregarActualizacion',
    templateUrl: './agregarActualizacion.component.html',
    styleUrls: ['./agregarActualizacion.component.css']
})


export class AgregarActualizacionComponent implements OnInit {

    constructor(
        private horarioService: HorarioService,
    ) {}
    
    Cerrar(): void{
        this.horarioService.modalAddActualizacion = !this.horarioService.modalAddActualizacion
    }

    ngOnInit(): void {

    }

    enviarActualizacion(): void{

    }

    cargarData(): void {
        
    }
}
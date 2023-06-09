import { Component, Input, OnInit } from '@angular/core';
import { Dia, Horario } from '../UltimaPlanificacion';
import { HorarioService } from '../services/horario.service';

@Component({
    selector: 'app-modal-itinerario',
    templateUrl: './modal-itinerario.component.html',
    styleUrls: ['./modal-itinerario.component.css']
})
export class ModalItinerarioComponent implements OnInit {

    @Input() itinerario: Dia;
    @Input() horario: Horario;

    constructor(
        public horarioService: HorarioService
    ) { }

    ngOnInit(): void {

    }

    prueba():void{}

    Cerrar(): void{
        this.horarioService.modalItinerarioPlanificacion = !this.horarioService.modalItinerarioPlanificacion
    }
}

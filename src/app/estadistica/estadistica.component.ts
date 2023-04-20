import { Component, Input, OnInit } from '@angular/core';
import { AllempleadosService } from '../services/allempleados.service';
import { DatoPlanificacion } from '../UltimaPlanificacion';

@Component({
    selector: 'app-estadistica',
    templateUrl: './estadistica.component.html',
    styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

    @Input() planificacionActual: DatoPlanificacion;
    

    constructor(
    ) { }

    ngOnInit(): void {
    }

}

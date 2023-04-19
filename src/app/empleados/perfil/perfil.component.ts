import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllempleadosService } from '../../services/allempleados.service';
import { response } from 'express';
import { DatoPlanificacion } from '../../UltimaPlanificacion';
import { Empleado } from '../../empleados';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private empleadoService: AllempleadosService
    ) { }

    public rut: string;
    public fechaActual = new Date().toLocaleDateString('es-cl');
    public credencial: Empleado
    public planificacion: DatoPlanificacion

    ngOnInit(): void {
        this.route.params.subscribe( params => {
            this.rut = params['rut'];
        });

        this.empleadoService.MostrarPerfil(this.rut).subscribe(
            response =>{
                console.log(response);
                this.credencial = response.data.credencial
                this.planificacion = response.data.planificacion
            }, error =>{
                console.error(error)
            }
        );
    }

}

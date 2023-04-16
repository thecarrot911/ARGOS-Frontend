import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

    constructor(private route: ActivatedRoute) { }
    public rut: string;

    ngOnInit(): void {
        const empleado = this.route.params.subscribe( params => {
            this.rut = params['rut'];
        });
    }

}

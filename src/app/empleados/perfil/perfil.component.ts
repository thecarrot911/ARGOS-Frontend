import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        const empleado = this.route.params;
        console.log(empleado);
    }

}

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AllempleadosService } from '../services/allempleados.service';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

    selector: boolean = false;
  

    selectorDropdown() {
        this.selector = !this.selector;
    }
  
    selected: string = "Collections";
    
    public isToggle: number;
    public rutaActual: string;
    // Control de imágen de fecha de vencimiento de credencial

    constructor(
        public empleadoService: AllempleadosService,
        public router: Router
    ) { }


    ngOnInit() {
        this.empleadoService.VencimientoCredencial().subscribe(
            response =>{
                this.empleadoService.vencimientoCredencial = response.data

            }, error =>{
                console.error(error);
            }
        )
        
        this.empleadoService.ejecutarFuncion$.subscribe(() => {
            this.ngOnInit();
        })

        this.router.events.subscribe((event) =>{
            if (event instanceof NavigationEnd){
                this.rutaActual = event.url;
            }
        })
    }

}

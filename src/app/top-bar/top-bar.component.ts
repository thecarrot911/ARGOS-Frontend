import { Component, OnInit } from '@angular/core';
import { AllempleadosService } from '../services/allempleados.service';
import { response } from 'express';

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
  isToggle: number = 1;

  // Control de imágen de fecha de vencimiento de credencial

  constructor(
    public empleadoService: AllempleadosService
  ) { }

  ejecutarOtraFuncion() {
    console.log('Se ejecutó otra función desde el Router Outlet');
  }

  ngOnInit() {
    this.empleadoService.VencimientoCredencial().subscribe(
      response =>{
          this.empleadoService.vencimientoCredencial = response.data
      },error =>{
        console.error(error);
      }
    )
    this.empleadoService.ejecutarFuncion$.subscribe(() => {
      this.ngOnInit();
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { Calendario, CalendarioAnual } from '../calendario';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AllSchedulesService } from '../services/allSchedules.service';

import { Posts } from '../posts';

@Component({
  selector: 'app-allSchedules',
  templateUrl: './allSchedules.component.html',
  styleUrls: ['./allSchedules.component.css']
})
export class AllSchedulesComponent implements OnInit {

  public calendarios! : Calendario;
  searchString : any;

  listaPosts: Posts[];

  listaCalendarios: any;


  constructor(
    private horarioService: HorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private allSchedules: AllSchedulesService
  ) { }

  ngOnInit() {

    this.allSchedules.getSchedulesByParameter()
    .subscribe(
      response =>
      {
        console.log(response)
        /* this.listaPosts = response; */
        this.listaCalendarios = response;
      }
    )


  }

  
}
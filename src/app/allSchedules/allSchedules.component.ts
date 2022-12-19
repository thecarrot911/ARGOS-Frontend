import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { Calendario } from '../calendario';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-allSchedules',
  templateUrl: './allSchedules.component.html',
  styleUrls: ['./allSchedules.component.css']
})
export class AllSchedulesComponent implements OnInit {

  public calendarios! : Calendario;
  searchString : any;


  constructor(
    private horarioService: HorarioService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let search = params['search'];

      this.horarioService.searchSchedules(search)
        .subscribe(
          response =>{
            console.log(response)
          },
          error =>{
            console.log(error);
          }
        )
    })
  }

  
}
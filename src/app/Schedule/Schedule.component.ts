import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';

@Component({
  selector: 'app-Schedule',
  templateUrl: './Schedule.component.html',
  styleUrls: ['./Schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  scheduleWorkers: any;

  public dias:any = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ]

  constructor(
    private horarioService: HorarioService,
  ) { 
 
   }

  ngOnInit() {
    this.scheduleWorkers = this.horarioService.getScheduleWorkers();

    for(let i = 1; i<=this.scheduleWorkers; i++){
      console.log(i);
    }
  }

}

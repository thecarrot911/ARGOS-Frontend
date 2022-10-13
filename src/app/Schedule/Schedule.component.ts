import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';

@Component({
  selector: 'app-Schedule',
  templateUrl: './Schedule.component.html',
  styleUrls: ['./Schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  scheduleWorkers: any;


  constructor(
    private horarioService: HorarioService,
  ) { 
 
   }

  ngOnInit() {
    this.scheduleWorkers = this.horarioService.getScheduleWorkers();
  }

}

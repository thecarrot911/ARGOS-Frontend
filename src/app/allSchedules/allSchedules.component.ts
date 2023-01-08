import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { Calendario, CalendarioAnual } from '../calendario';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AllSchedulesService } from '../services/allSchedules.service';
import { Calendarioanual, Data } from '../calendarioanual';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Itinerario } from '../calendario';

@Component({
  selector: 'app-allSchedules',
  templateUrl: './allSchedules.component.html',
  styleUrls: ['./allSchedules.component.css']
})
export class AllSchedulesComponent implements OnInit {

  public calendarios! : Calendario;
  searchString : any;
  searchAnio: any;

  listaCalendarios: Data[] = [];

  pageCalendario: number = 1;
  paginationCalendario = 1;
  countCalendario: number = 0;
  tableSizeCalendario: number = 1;
  tableSizesCalendario: any = [5, 10, 15, 20]

  CurrentDate = new Date();
  latest_date = this.datePipe.transform(this.CurrentDate, 'yyyy-MM-dd');
  today_is = this.datePipe.transform(this.CurrentDate, 'EEEE, MMMM d, y')

  public array_vacio: Array<Itinerario> = [];

  constructor(
    private horarioService: HorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private allSchedules: AllSchedulesService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {

  }

  buscarCalendarios(anio: string){
      this.allSchedules.getSchedulesByParameter(anio)
      .subscribe(
        response => {
          console.log(response)
          this.listaCalendarios = response.data
        },
        error =>{
          console.log(error)
        }
      )

  }

  onPaginationCalendario(event: any, anio: string) {
    this.pageCalendario = event;
    this.buscarCalendarios(anio);
  }

  onDisenoTabla(event: any, anio: string): void {
    this.tableSizeCalendario = event.target.value;
    this.pageCalendario = 1;
    this.buscarCalendarios(anio);
  }

  alertaComodin(comodin: string) {
    Swal.fire({
      title: 'Comodín',
      text: 'Se necesita comodín, turno: ' + comodin,
      imageUrl: 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/49908/joker-emoji-clipart-xl.png',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }

  alertaItinerario(itinerario: Itinerario) {
    Swal.fire({
      title: 'Alerta encuentros de aviones',
      html: 'Empleados faltantes: ' + + itinerario.falta + '<br>' + 'Turno del encuentro: ' + itinerario.turno_itinerario,
      icon: 'warning',
    })
  }

}
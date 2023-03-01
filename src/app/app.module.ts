import { LOCALE_ID, NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ScheduleComponent } from './Schedule/Schedule.component';
import { NavbarsComponent } from './Navbars/Navbars.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { AgregarActualizacionComponent } from './agregarActualizacion/agregarActualizacion.component';
import { ItinerarioAvionesComponent } from './itinerario-aviones/itinerario-aviones.component';
import { AllEmpleadosComponent } from './all-empleados/all-empleados.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ValidationErrors } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import 'moment/locale/es';


/* Providers */
import { DatePipe } from '@angular/common';

import { EditarActualizacionComponent } from './editarActualizacion/editarActualizacion.component';
import { PdfCalendarioComponent } from './pdf-calendario/pdf-calendario.component';
import { AllSchedulesComponent } from './allSchedules/allSchedules.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RegistrarEmpleadoComponent } from './registrar-empleado/registrar-empleado.component';
import { CredencialComponent } from './credencial/credencial.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ScheduleComponent,
    NavbarsComponent,
    FooterComponent,
    AgregarActualizacionComponent,
    ItinerarioAvionesComponent,
    EditarActualizacionComponent,
    PdfCalendarioComponent,
    AllSchedulesComponent,
    AllEmpleadosComponent,
    RegistrarEmpleadoComponent,
    CredencialComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DatePipe,
    FullCalendarModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    }),
    RouterModule.forRoot([
      { path: '', component: NavbarsComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'agregaractualizacion/:planificacion_id', component: AgregarActualizacionComponent },
      { path: 'itinerario-aviones', component: ItinerarioAvionesComponent },
      { path: 'editaractualizacion/:actualizacion_id', component: EditarActualizacionComponent },
      { path: 'allschedules', component: AllSchedulesComponent },
      { path: 'allEmpleados', component: AllEmpleadosComponent },
      { path: 'registrar-empleado', component: RegistrarEmpleadoComponent },
      { path: 'credencial/:rut', component: CredencialComponent}
    ]),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ScheduleComponent } from './Schedule/Schedule.component';
import { NavbarsComponent } from './Navbars/Navbars.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { AgregarActualizacionComponent } from './actualizacion/agregarActualizacion/agregarActualizacion.component';
import { ItinerarioAvionesComponent } from './itinerario-aviones/itinerario-aviones.component';
import { AllEmpleadosComponent } from './empleados/all-empleados/all-empleados.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { MomentModule } from 'ngx-moment';
import 'moment/locale/es';


/* Providers */
import { DatePipe } from '@angular/common';
import { PdfCalendarioComponent } from './pdf-calendario/pdf-calendario.component';
import { AllSchedulesComponent } from './allSchedules/allSchedules.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RegistrarEmpleadoComponent } from './empleados/registrar-empleado/registrar-empleado.component';
import { CredencialComponent } from './credenciales/credencial/credencial.component';
import { CredencialDirective } from './directives/credencial.directive';
import { AddCredencialComponent } from './credenciales/add-credencial/add-credencial.component';
import { UpdateCredencialComponent } from './credenciales/update-credencial/update-credencial.component';
import { UpdateEmpleadoComponent } from './empleados/update-empleado/update-empleado.component';
import { PerfilComponent } from './empleados/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ScheduleComponent,
    NavbarsComponent,
    FooterComponent,
    AgregarActualizacionComponent,
    ItinerarioAvionesComponent,
    PdfCalendarioComponent,
    AllSchedulesComponent,
    AllEmpleadosComponent,
    RegistrarEmpleadoComponent,
    CredencialComponent,
    CredencialDirective,
    AddCredencialComponent,
    UpdateCredencialComponent,
    UpdateEmpleadoComponent,
    PerfilComponent
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
      { path: 'allschedules', component: AllSchedulesComponent },
      { path: 'allEmpleados', component: AllEmpleadosComponent },
      { path: 'registrar-empleado', component: RegistrarEmpleadoComponent },
      { path: 'credencial/:rut', component: CredencialComponent},
      { path: 'perfil/:rut', component: PerfilComponent}
    ]),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

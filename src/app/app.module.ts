import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ScheduleComponent } from './Schedule/Schedule.component';
import { NavbarsComponent } from './Navbars/Navbars.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActualizacionesComponent } from './Actualizaciones/Actualizaciones.component';
import { FooterComponent } from './footer/footer.component';
import { AgregarActualizacionComponent } from './agregarActualizacion/agregarActualizacion.component';
import { ItinerarioAvionesComponent } from './itinerario-aviones/itinerario-aviones.component';
import { ActualizacionService } from './services/actualizacion.service';

@NgModule({
  declarations: [							
    AppComponent,
      TopBarComponent,
      ScheduleComponent,
      NavbarsComponent,
      ActualizacionesComponent,
      FooterComponent,
      AgregarActualizacionComponent,
      ItinerarioAvionesComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: NavbarsComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'agregaractualizacion', component: AgregarActualizacionComponent},
      { path: 'itinerario-aviones', component: ItinerarioAvionesComponent},
    ]),
  ],
  providers: [ActualizacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

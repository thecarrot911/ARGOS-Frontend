import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ScheduleComponent } from './Schedule/Schedule.component';
import { NavbarsComponent } from './Navbars/Navbars.component';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { ActualizacionesComponent } from './Actualizaciones/Actualizaciones.component';

@NgModule({
  declarations: [				
    AppComponent,
      TopBarComponent,
      ScheduleComponent,
      NavbarsComponent,
      ActualizacionesComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: NavbarsComponent },
      { path: 'schedule', component: ScheduleComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

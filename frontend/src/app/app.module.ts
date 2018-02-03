import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { DiagnosticianComponent } from './diagnostician/diagnostician.component';
import { ParentComponent } from './parent/parent.component';
import { TeacherComponent } from './teacher/teacher.component';
import { routing } from "./app.routing";
import { DiagNavbarComponent } from './diagnostician/diag-navbar/diag-navbar.component';

import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiagnosticianComponent,
    ParentComponent,
    TeacherComponent,
    DiagNavbarComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

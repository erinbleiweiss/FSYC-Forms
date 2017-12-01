import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { DiagnosticianComponent } from "./diagnostician/diagnostician.component";
import { DIAGNOSTICIAN_ROUTES } from "./diagnostician/diagnostician.routes";
import { PARENT_ROUTES } from "./parent/parent.routes";
import { TEACHER_ROUTES } from "./teacher/teacher.routes";

const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'diagnostician',
    children: DIAGNOSTICIAN_ROUTES
  },
  {
    path: 'parent',
    children: PARENT_ROUTES
  },
  {
    path: 'teacher',
    children: TEACHER_ROUTES
  }
];

export const routing = RouterModule.forRoot(APP_ROUTES);

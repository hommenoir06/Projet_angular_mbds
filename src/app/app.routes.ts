import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
//import { HomeComponent } from './home.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AuthGuard } from './shared/auth.guard';
import { AssignmentsScrollingComponent } from './assignments/assignments-scrolling/assignments-scrolling.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: AssignmentsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'scrolling', component: AssignmentsScrollingComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddAssignmentComponent, canActivate: [AuthGuard] },
  { path: 'assignments/:id', component: AssignmentDetailComponent, canActivate: [AuthGuard] },
  { path: 'assignments/:id/edit', component: EditAssignmentComponent, canActivate: [AuthGuard] },
  // Redirige vers la page d'accueil si une route incorrecte est spécifiée
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];


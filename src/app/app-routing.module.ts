import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from "./welcome/welcome.component";
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './auth/training/training.component';
import { CurrentTrainingComponent } from './auth/training/current-training/current-training.component';
import { NewTrainingComponent } from './auth/training/new-training/new-training.component';
import { PastTrainingComponent } from './auth/training/past-training/past-training.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'welcome',component:WelcomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'training',component:TrainingComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard],
})
export class AppRoutingModule { }

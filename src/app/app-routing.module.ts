import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import {VehiclesComponent} from './pages/vehicles/vehicles.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'vaisseaux',
    component: VehiclesComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

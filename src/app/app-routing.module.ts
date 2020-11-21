import { NgModule } from '@angular/core';
/**
 * Add the imports + any component used in the routes
*/
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';

//import { CommonModule } from '@angular/common';

/**
 * these routes are important as well
*/
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroes/:id', component: HeroDetailsComponent },
  { path: 'dashboard', component: DashboardComponent }
];
/**
 * these imports/exports 
*/
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

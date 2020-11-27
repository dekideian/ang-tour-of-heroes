import { NgModule } from '@angular/core';
/**
 * Add the imports + any component used in the routes
*/
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SecretComponentComponent } from './secret-component/secret-component.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { AuthGuard } from './services/auth.guard';


//import { CommonModule } from '@angular/common';

/**
 * these routes are important as well
*/
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroes/:id', component: HeroDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'secret', component: SecretComponentComponent, canActivate: [AuthGuard] }
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

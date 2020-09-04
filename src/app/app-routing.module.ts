import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

/* Routes tell the router which view to display when a user clicks a link 
Angular Routes usually have 2 properties. 
- path: a string that matches the URL in the address bar
- component: the component that the browser should create when navigating to this route
*/
const routes: Routes = [  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}, // make the app navigate to the dashboard automatically
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent } // parameterized route
];


/*
forRoot 
- implies configuring router at the app's root level
- supplies service providers and directives needed for routing
*/
@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule] // so that it is made available throughout the app
})
export class AppRoutingModule { }

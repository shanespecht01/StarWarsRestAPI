import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeopleComponent } from './components/people/people.component';
import { FilmsComponent } from './components/films/films.component';

const routes: Routes = [
  { path: '', redirectTo: 'people', pathMatch: 'full'},
  { path: 'people', component: PeopleComponent },
  { path: 'films', component: FilmsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

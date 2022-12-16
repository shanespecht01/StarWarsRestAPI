import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeopleComponent } from './components/people/people.component';

const routes: Routes = [
  { path: '', redirectTo: 'people', pathMatch: 'full'},
  { path: 'people', component: PeopleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

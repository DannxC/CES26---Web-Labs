import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormularioComponent } from './formulario/formulario.component';  // My code

const routes: Routes = [
  { path: 'formulario', component: FormularioComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'about', component: AboutComponent }
  // { path: '', redirectTo: '/formulario', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogBoxComponent } from './log-box/log-box.component';

const routes: Routes = [
  { path: '', component: LogBoxComponent }, // Rota principal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

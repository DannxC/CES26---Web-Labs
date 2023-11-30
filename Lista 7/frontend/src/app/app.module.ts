import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

//import { AboutComponent } from './about/about.component';
import { FormularioComponent } from './formulario/formulario.component'; // My code


const routes: Routes = [
  { path: 'home', component: HomeComponent }
//   { path: 'about', component: AboutComponent },

// Adicione outras rotas conforme necessário
];


@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    HomeComponent,
    // AboutComponent
  ],
  imports: [
    RouterModule.forRoot(routes), // My code
    ReactiveFormsModule,          // My code
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

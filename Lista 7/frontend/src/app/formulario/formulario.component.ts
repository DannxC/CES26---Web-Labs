import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  nome: string;

  constructor(private http: HttpClient) {
    this.nome = '';
  }
  
  enviarDados() {
    this.http.post('http://localhost:3000/dados', { nome: this.nome }).subscribe();
  }
}

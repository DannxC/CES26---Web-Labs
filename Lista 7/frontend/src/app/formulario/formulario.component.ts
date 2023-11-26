import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  meuFormulario: FormGroup;

  constructor(private http: HttpClient) {
    this.meuFormulario = new FormGroup({
      nome: new FormControl('') // nome é o campo do seu formulário
    });
  }

  enviarNome() {
    const nome = this.meuFormulario.value.nome;
    this.http.post('http://localhost:3000/api/nomes', { nome }).subscribe(
      response => console.log('Resposta do servidor:', response),
      error => console.error('Erro ao enviar nome:', error)
    );
  }
}

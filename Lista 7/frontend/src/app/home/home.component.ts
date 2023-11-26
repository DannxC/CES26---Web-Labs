import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  meuFormulario: FormGroup;  // Declaração da variável para o formulário

  constructor() {
    // Inicialização do formulário no construtor
    this.meuFormulario = new FormGroup({
      campo1: new FormControl(''), // Exemplo de campo inicializado como string vazia
      // Adicione outros campos do formulário aqui, se necessário
    });
  }

  ngOnInit(): void {
    // Aqui você pode adicionar lógicas adicionais que precisam ser executadas quando o componente é inicializado
  }

  // Adicione outros métodos necessários para a lógica do seu componente
}

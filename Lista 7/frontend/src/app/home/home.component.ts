import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importe o Router


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { // Injete o Router no construtor

  }
  ngOnInit(): void {
    // Aqui você pode adicionar lógicas adicionais que precisam ser executadas quando o componente é inicializado
  }

  // Método para ir para a página do formulário 
  goToForm(): void {
    this.router.navigate(['/formulario']); // Use o Router para navegar para a rota do formulário
  }
  // Adicione outros métodos necessários para a lógica do seu componente
}

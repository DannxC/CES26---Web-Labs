import { Component } from '@angular/core';

import { DadosService } from './dados.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'frontend';
  nomes: string[] = [];

  constructor(private dadosService: DadosService) {
    this.dadosService.obterNomes().subscribe(nomes => {
      this.nomes = nomes;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-log-box',
  templateUrl: './log-box.component.html',
  styleUrls: ['./log-box.component.css']
})
export class LogBoxComponent implements OnInit {
  logMessages: string[] = [];
  logInput: string = ''; // Nova propriedade para armazenar a entrada do usuário

  constructor(private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.logMessages = this.loggingService.getLogs();
  }

  enviarLog(): void {
    if (this.logInput) {
      this.loggingService.log(this.logInput); // Envia a mensagem para o serviço de logging
      this.logInput = ''; // Limpa o campo de entrada
      this.logMessages = this.loggingService.getLogs(); // Atualiza as mensagens de log
    }
  }
}

import { Component } from '@angular/core';
import { OnInit } from '@angular/core'; // My code

import { LoggingService } from './logging.service'; // My code

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private loggingService: LoggingService) {}

  ngOnInit() {
    this.loggingService.log('Mensagem de teste');
  }
}

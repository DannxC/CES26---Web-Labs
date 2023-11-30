import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private logs: string[] = [];

  log(message: string) {
    const timestampedMessage = `${new Date().toISOString()}: ${message}`;
    this.logs.push(timestampedMessage);
    console.log(timestampedMessage); // Para também ver no console
  }

  getLogs() {
    return this.logs;
  }
}

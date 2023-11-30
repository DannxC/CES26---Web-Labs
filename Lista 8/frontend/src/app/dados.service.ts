import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";  // my code
import { Observable } from "rxjs";  // my code

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  constructor(private http: HttpClient) { }

  obterNomes(): Observable<string[]> {  // my code
    return this.http.get<string[]>('http://localhost:3000/nomes');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private clientSubject: BehaviorSubject<Client>;
  // public client: Client;
  public client: string;
  private clientUrl: string;


  constructor(private http: HttpClient) {
    this.clientUrl = 'http://localhost:8080/api/auth/';
    this.clientSubject = new BehaviorSubject<Client>(JSON.parse(localStorage.getItem('client') || '{}'));
    // this.client = this.clientSubject.value;
    this.client = "";
  }

  login(phone: string, password: string) {
    return this.http.post<Client>(this.clientUrl, { phone, password })
        .pipe(map(client => {
            localStorage.setItem('client', JSON.stringify(client));
            this.clientSubject.next(client);
            return client;
        }));
  }

  isClientLoggedIn() {
    console.log(this.client);
    return !(this.client === "");
  }
}

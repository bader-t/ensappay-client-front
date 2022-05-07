import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private clientSubject: BehaviorSubject<Client>;
  // public client: Client;
  private clientUrl: string;

  client = "b";
  constructor(private http: HttpClient,private router: Router) {
    this.clientUrl = 'http://localhost:8080/api/auth/';
    this.clientSubject = new BehaviorSubject<Client>(JSON.parse(localStorage.getItem('client') || '{}'));
    // this.client = this.clientSubject.value;

  }

  login(phone: string, password: string) {
    return this.http.post<Client>(this.clientUrl + "login", { phone, password })
        .pipe(map(client => {
            localStorage.setItem('client', JSON.stringify(client));
            this.clientSubject.next(client);
            return client;
        }));
  }

  isLoggedIn() {
    console.log(this.client);
    return !(this.client === "");
  }
  isPasswordNotReseted() {
    console.log(this.client);
    return true;
  }

  logout(){
    this.client = "";
    localStorage.removeItem('client');
    this.router.navigate(['']);
  }
}

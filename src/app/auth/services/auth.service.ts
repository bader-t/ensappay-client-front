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
  public client: Observable<Client>;
  private clientUrl: string;


  constructor(private http: HttpClient, private router: Router) {
    this.clientUrl = 'http://localhost:8080/api/';
    this.clientSubject = new BehaviorSubject<Client>(JSON.parse(localStorage.getItem('client') || '{}'));
    this.client = this.clientSubject.asObservable();
  }

  public get clientValue(): Client {
    return this.clientSubject.value;
  }

  login(phoneNumber: string, password: string) {
    return this.http.post<Client>(this.clientUrl + "login", { phoneNumber, password })
      .pipe(map(client => {
        localStorage.setItem('client', JSON.stringify(client));
        this.clientSubject.next(client);
        return client;
      }));
  }

  isLoggedIn() {
    console.log(this.client);
    return !(this.clientSubject === null);
  }

  isFirstLogin() {
    return this.clientValue.isFirstLogin;
  }

  changePassword(model: any) {
    return this.http.post(this.clientUrl + "account/client/change-password", model);
  }


  logout() {
    localStorage.removeItem('client');
    this.clientSubject.next(null!);
    this.router.navigate(['']);
  }
}

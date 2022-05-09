import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private clientUrl: string;


  constructor(private http: HttpClient, private router: Router, private tokenStorage: TokenStorageService) {
    this.clientUrl = 'http://localhost:8080/api/';
  }



  login(phoneNumber: string, password: string): Observable<any> {
    return this.http.post<HttpResponse<any>>(this.clientUrl + 'login', {
      phoneNumber,
      password
    }, { observe: 'response' as 'response' });
  }


  isLoggedIn() {
    return !(this.tokenStorage.getToken() === null);
  }

  isFirstLogin() {
    return this.tokenStorage.getIsFirstLogin();
  }

  changePassword(model: any) {
    return this.http.post(this.clientUrl + "account/client/change-password", model);
  }

  refreshToken(token: string) {
    return this.http.post(this.clientUrl + 'auth/refresh', {
      refreshToken: token
    }, httpOptions);
  }

  getClientName() {
    this.tokenStorage.getClient().name;
  }


  // logout() {
  //   localStorage.removeItem('client');
  //   this.clientSubject.next(null!);
  //   this.router.navigate(['']);
  // }
}

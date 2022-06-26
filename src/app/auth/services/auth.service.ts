import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private clientUrl: string;


  constructor(private http: HttpClient, private router: Router, private tokenStorage: TokenStorageService) {
    this.clientUrl = 'https://ensa-pay-2022.herokuapp.com/api/';
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
    return this.http.put(this.clientUrl + "account/client/change-password", model, httpOptions);
  }

  refreshToken(token: string, headers: HttpHeaders) {
    return this.http.post(this.clientUrl + 'auth/refresh', {
      refresh_token: token
    }, { headers: headers });
  }

  getClientName() {
    return this.tokenStorage.getClient().name;
  }



}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private clientUrl: string;

  constructor(private http: HttpClient) {
    this.clientUrl = 'https://ensa-pay-2022.herokuapp.com/api/account/client/';
  }

  public register(client: Client): Observable<Client> {
    return this.http.post<Client>(this.clientUrl + 'register', client);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  logout(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem('access_token');
    window.localStorage.setItem('refresh_token', token);

    const client = this.getClient();
    if (client.id) {
      this.saveClient({ ...client, accessToken: token });
    }
  }


  public setIsFirstLogin(isFirstLogin: string): void {
    window.localStorage.removeItem('firstlogin');
    window.localStorage.setItem('firstlogin', isFirstLogin);
  }

  public getIsFirstLogin(): boolean | null {
    return window.localStorage.getItem('firstlogin') === 'true';
  }


  public getToken(): string | null {
    return window.localStorage.getItem('access_token');
  }



  public saveRefreshToken(token: string): void {
    window.localStorage.removeItem('refresh_token');
    window.localStorage.setItem('refresh_token', token);
  }

  public getRefreshToken(): string | null {
    return window.localStorage.getItem('refresh_token');
  }

  public saveClient(client: any): void {
    window.localStorage.removeItem('clientProfile');
    window.localStorage.setItem('clientProfile', JSON.stringify(client));
  }

  public getClient(): any {
    const client = window.localStorage.getItem('clientProfile');
    if (client) {
      return JSON.parse(client);
    }
    return {};
  }
}

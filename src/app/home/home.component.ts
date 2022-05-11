import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  client: string;

  constructor(private authService: AuthService) {
    this.client = this.authService.getClientName();
  }

}

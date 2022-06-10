import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   client: any;

   constructor(private authStorageService: TokenStorageService) {
     
    this.client = this.authStorageService.getClient();
  }

  ngOnInit(): void {
  }

}

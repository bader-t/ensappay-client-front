import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  client: any;
  balance: string = "";

  constructor(private authStorageService: TokenStorageService, private providerService: ProviderService) {

    this.client = this.authStorageService.getClient();
  }

  ngOnInit(): void {
    this.providerService.consultBalance(this.authStorageService.getPhoneNumber()!).subscribe({
      next: (data: any) => {
        this.balance = data;
      },
      error: (e: any) => {
      },
      complete: () => {
      }
    })
  }

}

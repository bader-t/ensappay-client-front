import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Provider } from '../../models/provider.model';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-creditors',
  templateUrl: './creditors.component.html',
  styleUrls: ['./creditors.component.css']
})
export class CreditorsComponent implements OnInit {

  providers: Provider[] = [];

  constructor(private providerService: ProviderService, private alertService: AlertService) { }


  ngOnInit(): void {
    this.getAllProviders();
  }

  getAllProviders(): void {
    this.providerService.getAll().subscribe({
      next: (data: any) => {
        this.providers = data;
      },
      error: (e: any) => {
        this.alertService.error(e.error.message);
      },
      complete: () => {
      }
    })
  }

}

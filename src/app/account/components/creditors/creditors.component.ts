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

  MarocTLC_URL: string = "https://halberdbastion.com/sites/default/files/2017-08/Maroc-Telecom-Logo.png";
  Inwi_URL: string = "https://www.marocemploi.cc/storage/files/ma/68/thumb-816x460-369c557388a7b34f87e6ae42fe50d9d6.jpg";
  Orange_URL: string = "https://www.adipsys.com/wp-content/uploads/2018/11/Logo-Orange-emea.png";


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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Provider } from '../../models/provider.model';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  provider?: Provider;
  surname?: String;

  constructor(private router: Router, private route: ActivatedRoute, private providerService: ProviderService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.surname = this.route.snapshot.params['surname'];
    this.provider = this.providerService.findBySurname(this.surname);
    if (!this.provider) {
      this.alertService.warn("Not Found", { keepAfterRouteChange: true });
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationComponent } from './components/donation/donation.component';
import { FactureComponent } from './components/facture/facture.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RechargeComponent } from './components/recharge/recharge.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '', component: ProfileComponent,
      },
      {
        path: 'operations', component: InvoiceComponent,
      },
      {
        path: 'operations/recharge/:surname', component: RechargeComponent,
      },
      {
        path: 'operations/donation/:surname', component: DonationComponent,

      },
      {
        path: 'operations/facture/:surname', component: FactureComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

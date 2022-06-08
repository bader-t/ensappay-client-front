import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { CreditorsComponent } from './components/creditors/creditors.component';
import { HistoryComponent } from './components/history/history.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProfileComponent,
    InvoiceComponent,
    CreditorsComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { 

}

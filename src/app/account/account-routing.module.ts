import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditorsComponent } from './components/creditors/creditors.component';
import { HistoryComponent } from './components/history/history.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

const routes: Routes = [
  {
    path :'', component:InvoiceComponent,
    children:[
      {
        path:'creditors', component:CreditorsComponent,
      },
      {
        path:'', component:CreditorsComponent,
      },
      {
        path:'history', component:HistoryComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

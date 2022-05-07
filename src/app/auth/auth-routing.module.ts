import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
        { path: 'login', component: LoginComponent },
        { path: 'create-account', component: CreateAccountComponent },
        { path: 'change-password', component: ChangePasswordComponent }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

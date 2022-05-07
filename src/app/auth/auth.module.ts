import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    CreateAccountComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports:[
    LoginComponent,
    ChangePasswordComponent,
    CreateAccountComponent,
    LayoutComponent
  ]
})
export class AuthModule { }

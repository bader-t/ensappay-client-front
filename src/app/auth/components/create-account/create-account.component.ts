import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { AlertService } from 'src/app/shared/services/alert.service';
import { AccountService } from '../../services/account.service';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  loading = false;
  submitted = false;

  accountForm = new FormGroup({
    productType: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  get f() { return this.accountForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.accountForm.invalid) {
      return;
    }
    this.loading = true;
    this.createAccount();
  }

  private createAccount() {

    this.accountService.register(this.accountForm.value).subscribe(
      {
        next: (v: any) => {
          this.alertService.success(v);
          this.loading = false;
        },
        error: (e: any) => {
          this.alertService.error(e.statusText);
          this.loading = false;
        },
        complete: () => {
          this.alertService.success("Votre demande est envoyée avec succé");
        }
      }
    );
  }

}


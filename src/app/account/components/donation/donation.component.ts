import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Provider } from '../../models/provider.model';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  provider?: Provider;
  surname?: string;

  client: any;
  // static min(min: number): ValidatorFn;

  nom?: string;
  amount?: string;
  date?: string;

  loading = false;
  submitted = false;
  submitted1 = false;

  closeResult?: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private authStorageService: TokenStorageService,
    private alertService: AlertService,
    private modalService: NgbModal) {

    this.client = this.authStorageService.getClient();
    this.nom = this.client.name + " " + this.client.surname;

  }

  ngOnInit(): void {
    this.surname = this.route.snapshot.params['surname'];
    this.provider = this.providerService.findBySurname(this.surname!, "donation");
    if (!this.provider) {
      this.alertService.warn("Introuvable", { keepAfterRouteChange: true });
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
  }

  donationForm = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  otpForm = new FormGroup({
    otp: new FormControl('', Validators.required),
  });

  get o() { return this.otpForm.controls; }
  get f() { return this.donationForm.controls; }

  onSubmit() {

    this.providerService.donation({
      phoneNumber: this.authStorageService.getClient().phoneNumber,
      creancierCode: this.provider?.creancierCode, ...this.donationForm.value
    }).subscribe(
      {
        next: (v: any) => {
          this.loading = false;
        },
        error: (e: any) => {
          this.alertService.error(e.statusText);
          this.loading = false;
        },
        complete: () => {
          this.modalService.dismissAll();
          this.alertService.success("Operation effectuée avec succé");
        }
      }
    );


  }

  openDialog(content: any) {
    this.submitted = true;
    this.alertService.clear();
    if (this.donationForm.invalid) {
      return;
    }
    this.date = (new Date()).toLocaleDateString();
    this.amount = this.f['amount'].value;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  openOTPDialog(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  verifyOTP() {
    if (this.otpForm.invalid) {
      return;
    }
    this.providerService.otp(this.otpForm.value).subscribe(
      {
        next: (v: any) => {
        },
        error: (e: any) => {
          this.alertService.error(e.statusText);
        },
        complete: () => {
          this.onSubmit();
        }
      }
    );
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}

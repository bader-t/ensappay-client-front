import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  nom?: string;
  amount?: string;
  date?: string;

  loading = false;
  submitted = false;
  submitted1 = false;

  closeResult?: string;
  otpError: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private tokenStorageService: TokenStorageService) {

    this.client = this.tokenStorageService.getClient();
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
      phoneNumber: this.tokenStorageService.getClient().phoneNumber,
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
    this.providerService.sendOTP(this.tokenStorageService.getPhoneNumber()).subscribe({
      next: (v: any) => {
      },
      error: (e: any) => {
        console.log(e)
      },
      complete: () => {
      }
    });;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  verifyOTP() {
    this.submitted1 = true;
    if (this.otpForm.invalid) {
      return;
    }
    this.providerService.verifyOTP({ ...this.otpForm.value, phone: this.tokenStorageService.getPhoneNumber() }).subscribe(
      {
        next: (v: any) => {
          this.otpError = false;
        },
        error: (e: any) => {
          this.otpError = true;
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

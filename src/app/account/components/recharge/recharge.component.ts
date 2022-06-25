import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Provider } from '../../models/provider.model';
import { ProviderService } from '../../services/provider.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  provider?: Provider;
  surname?: string;

  phone?: string;
  creancierCode?: string;
  amount?: string;
  date?: string;

  loading = false;
  submitted = false;
  submitted1 = false;

  closeResult?: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private alertService: AlertService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.surname = this.route.snapshot.params['surname'];
    this.provider = this.providerService.findBySurname(this.surname!, "recharge");
    if (!this.provider) {
      this.alertService.warn("Introuvable", { keepAfterRouteChange: true });
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
  }

  rechargeForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    creancierCode: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
  });

  otpForm = new FormGroup({
    otp: new FormControl('', Validators.required),
  });


  get f() { return this.rechargeForm.controls; }
  get o() { return this.otpForm.controls; }


  onSubmit() {

    this.providerService.recharge(this.rechargeForm.value).subscribe(
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
          this.alertService.success("Operation effectuée avec succés");
        }
      }
    );


  }

  openDialog(content: any) {
    this.submitted = true;
    this.alertService.clear();
    if (this.rechargeForm.invalid) {
      return;
    }
    this.date = (new Date()).toLocaleDateString();
    this.phone = this.f['phoneNumber'].value;
    this.creancierCode = this.f['creancierCode'].value;
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

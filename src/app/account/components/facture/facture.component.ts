import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Creance } from '../../models/creance.model';
import { Provider } from '../../models/provider.model';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

  creances: Creance[] = [];

  creanceAppartient: Creance[] = [];

  creanceSelected: Creance[] = [];

  provider?: Provider;
  surname?: string;

  client: any;

  nom?: string;
  total?: number = 0.00;
  date?: string;

  loading = false;
  submitted = false;
  submitted1 = false;

  closeResult?: string;
  otpError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private tokenStorageService: TokenStorageService,
    private alertService: AlertService,
    private modalService: NgbModal) {

    this.client = this.tokenStorageService.getClient();
    this.nom = this.client.name + " " + this.client.surname;

  }

  ngOnInit(): void {
    this.creances = [];
    this.surname = this.route.snapshot.params['surname'];
    this.provider = this.providerService.findBySurname(this.surname!, "facture");
    this.getAllCreances(this.provider?.code!);



    if (!this.provider) {
      this.alertService.warn("Not Found", { keepAfterRouteChange: true });
      this.router.navigate(['../../'], { relativeTo: this.route });
    }

  }

  otpForm = new FormGroup({
    otp: new FormControl('', Validators.required),
  });
  get o() { return this.otpForm.controls; }

  getAllCreances(code: number): void {
    this.providerService.getFactures(code).subscribe({
      next: (data: any) => {
        this.creances = data;
      },
      error: (e: any) => {
        this.alertService.error(e.error.message);
      },
      complete: () => {
      }
    })
  }

  onSubmit() {
    this.creanceSelected = [];

    // this.creances.map((val) => {

    //   if (val.selected) {
    //     this.creanceSelected?.push(val);

    //   } else {

    //   }
    // }

    // );
    this.creanceSelected = this.creances.filter(creance => creance.selected);
    console.log('selected', this.creanceSelected);

  }

  onChange(code: any) {

    this.creances.map((val) => {

      if (val.code == code) {
        val.selected = !val.selected;
        console.log(val.amount);

        if (val.selected) {
          this.total = this.total! + val.amount!;
          console.log("new total", this.total);
        } else {
          this.total = this.total! - val.amount!;
          console.log("new total", this.total);
        }
      }
    });
  }

  openDialog(content: any) {
    this.submitted = true;
    this.alertService.clear();

    this.date = (new Date()).toLocaleDateString();

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openOTPDialog(content: any) {
    this.providerService.sendOTP(this.tokenStorageService.getPhoneNumber());
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

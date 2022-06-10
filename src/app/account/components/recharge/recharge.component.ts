import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Provider } from '../../models/provider.model';
import { ProviderService } from '../../services/provider.service';
import { ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  provider?: Provider;
  surname?: String;

  phone?: String;
  type?: String;
  amount?: String;
  date?:String;

  


  setPhone(value:any) {
    console.log(value);
    this.phone = value;
  }
  setType(value:any) {
    this.type = value;
  }
  setAmount(value:any) {
    this.amount = value;
  }


  closeResult?:String;
  constructor( private router: Router, 
               private route: ActivatedRoute, 
               private providerService: ProviderService, 
               private alertService: AlertService,
               private modalService : NgbModal) { }

  ngOnInit(): void {
    this.surname = this.route.snapshot.params['surname'];
    this.provider = this.providerService.findBySurname(this.surname);
    if (!this.provider) {
      this.alertService.warn("Not Found", { keepAfterRouteChange: true });
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
  }

  open(content:any) {
    const now = new Date();

    //passing data to local variables
    this.date = now.toLocaleDateString()
    this.phone = (document.getElementById("phone") as HTMLInputElement).value; 
    this.type = (document.getElementById("type") as HTMLInputElement).value; 
    this.amount = (document.getElementById("amount") as HTMLInputElement).value; 
    
    if(this.phone.match(/^[0-9]+$/) && this.phone.length == 10){
      // open the Modal popup
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }else{
      console.log("Error phone number is incorrecte")
    }
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

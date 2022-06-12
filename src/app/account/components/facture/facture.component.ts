import { Component, OnInit } from '@angular/core';
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

  creances: Creance[] = [
    {
        code: 12 ,

        dueDate: "12-11-2020",

        amount:245.99,

        creanceStatus: "UNPAID",

        serviceProvider: {
          name: "Orange",
          code : 3,
        },

        creancier:"electricite"
    },
    {
        code: 11 ,

        dueDate: "12-05-2020",

        amount:178.24,

        creanceStatus: "UNPAID",

        serviceProvider: {
          name: "Orange",
          code : 3,
        },

        creancier:"fibre"
    },
    {
        code: 10,

        dueDate: "12-35-2553",

        amount:245.99,

        creanceStatus: "COMPLETE",

         serviceProvider: {
          name: "Inwi",
          code : 2,
        },


        creancier:"Abonnement"
    },
  ];

  creanceAppartient : Creance[] = [];

  creanceSelected : Creance[] = [];

  provider?: Provider;
  surname?: String;

  client: any;
  // static min(min: number): ValidatorFn;

  nom?: String;
  total?: number = 0.00;
  date?: String;

  loading = false;
  submitted = false;

  closeResult?: String;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private authStorageService: TokenStorageService,
    private alertService: AlertService,
    private modalService: NgbModal) { 

      //get client data from the auth service 
        this.client = this.authStorageService.getClient();
        this.nom = this.client.name + " " +this.client.surname;

    }

  ngOnInit(): void {

    this.surname = this.route.snapshot.params['surname'];
    this.provider = this.providerService.findBySurname(this.surname);

    this.provider?.code!=3;

    console.log("provider code",this.provider?.code!);

    this.creances.map((val)=>{
      console.log("val code",val.serviceProvider?.code!);
      if(val.creanceStatus=="UNPAID" && val.serviceProvider?.code==this.provider?.code){
        this.creanceAppartient.push(val);
      }
    });

    if (!this.provider) {
      this.alertService.warn("Not Found", { keepAfterRouteChange: true });
      this.router.navigate(['../../'], { relativeTo: this.route });
    }

  }

  onSubmit(){
    this.creanceSelected=[];

    this.creanceAppartient.map((val)=>{
     
        if(val.selected){
            this.creanceSelected?.push(val);
          
        }else{
           
        }
      } 
    );
    console.log(this.creanceSelected);

  }

  onChange(code:any){
   
    this.creanceAppartient.map((val)=>{

      if(val.code==code){
        val.selected = !val.selected;
        console.log(val.amount);

        if(val.selected){
          this.total= this.total! + val.amount!;
          console.log("new total",this.total);
        }else{
          this.total= this.total! - val.amount!;
          console.log("new total",this.total);
        }
      }
    } );
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

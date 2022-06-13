import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Creance } from '../../models/creance.model';
import { Provider } from '../../models/provider.model';
import { HistoryService } from '../../services/history.service';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

  creances: Creance[] = [];

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private authStorageService: TokenStorageService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private historyService: HistoryService) { 

      //get client data from the auth service 
        this.client = this.authStorageService.getClient();
        this.nom = this.client.name + " " +this.client.surname;

    }

  ngOnInit(): void {

    //get all the creances UNPAID
    this.getAllCreances();

    this.surname = this.route.snapshot.params['surname'];
    this.provider = this.providerService.findBySurname(this.surname);


    // added only the creances unpaid of the current provider service to creanAppartien List:
    this.creances.map((val)=>{

      console.log("val code",val.serviceProvider?.code!);

      if(val.serviceProvider?.code==this.provider?.code){
        this.creanceAppartient.push(val);
      }

    });

    if (!this.provider) {
      this.alertService.warn("Not Found", { keepAfterRouteChange: true });
      this.router.navigate(['../../'], { relativeTo: this.route });
    }

  }
   getAllCreances(): void {
    this.historyService.getAll("UNPAID").subscribe({
      next: (data: any) => {
        console.log(data);

        data.map((val: any)=>{
          console.log(val);
            this.creances.push(val);
          
        });
        
      },
      error: (e: any) => {
        this.alertService.error(e.error.message);
      },
      complete: () => {
      }
    })
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

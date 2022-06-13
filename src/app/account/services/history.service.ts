import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stat } from 'fs';
import { Observable, of } from 'rxjs';
import { Creance, ServiceProvider } from '../models/creance.model';
import { History } from '../models/history.model';

const historyUrl = 'http://localhost:8080/api/histories';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  histories: Creance[] = [
    {
        code: 12 ,

        dueDate: "12-11-2020",

        amount:245.99,

        creanceStatus: "UNPAID",

        serviceProvider: {
          name: "Orange",
          code : 3,
          image: "",
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
          image: "",
        },

        creancier:"fibre"
    },
    {
        code: 10,

        dueDate: "12-35-2553",

        amount:245.99,

        creanceStatus: "COMPLETED",

         serviceProvider: {
          name: "Inwi",
          code : 2,
          image: "https://www.bitrefill.com/content/cn/b_rgb%3AFFFFFF%2Cc_pad%2Ch_800%2Cw_800/v1558461784/inwi.jpg",
        },


        creancier:"Abonnement"
    },
  ];

  creances:Creance[]=[];


  constructor(private http: HttpClient) {

  }

  getAll(status : string): Observable<History[]> {
    this.creances = [];
    this.getCreditors(status);
    if(status=="COMPLETED") return of(this.histories);
    else return of(this.creances);
  }

  getCreditors(status : string): void {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/cmi-soap/creanciesList', true);
    const sr =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cre="http://www.ebanking.ensa/accountservice/Soap/Request/CreancesList/">
            <soapenv:Header/>
            <soapenv:Body>
                <cre:CreancesListRequest>?</cre:CreancesListRequest>
            </soapenv:Body>
          </soapenv:Envelope>`;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {


          const creances = xmlhttp.responseXML?.getElementsByTagName('ns2:creance');

          console.log('>>', xmlhttp.responseXML)

          for (let i = 0; i < creances?.length!; i++) {

            console.log(parseInt(creances?.item(i)?.childNodes[0].textContent!));
            console.log(creances?.item(i)?.childNodes[1].textContent);
            console.log(creances?.item(i)?.childNodes[2].textContent);
            console.log(parseInt(creances?.item(i)?.childNodes[3].childNodes[0].textContent!));
            console.log(creances?.item(i)?.childNodes[3].childNodes[1].textContent);
            console.log(creances?.item(i)?.childNodes[3].childNodes[2].textContent);
            console.log(creances?.item(i)?.childNodes[3].childNodes[3].textContent);

            let serviceCode = parseInt(creances?.item(i)?.childNodes[0].textContent!);
            let serviceName = creances?.item(i)?.childNodes[1].textContent!;
            let serviceImage = creances?.item(i)?.childNodes[1].textContent!;

            let creaneStatus = (creances?.item(i)?.childNodes[2].textContent)?.toLocaleLowerCase();
            let code = parseInt(creances?.item(i)?.childNodes[3].childNodes[0].textContent!);
            let dueDate = creances?.item(i)?.childNodes[3].childNodes[1].textContent!;
            
            let amount = parseFloat(creances?.item(i)?.childNodes[3].childNodes[2].textContent!);
            let creancierName = creances?.item(i)?.childNodes[3].childNodes[3].textContent!;

            //build new creance
            let creance = new Creance( 
              code,
              dueDate,
              amount,
              creaneStatus,  
              creancierName);
            
            let serviceProvider = new ServiceProvider(serviceCode,serviceName,serviceImage);

            //adding the service provider info to creance
            creance.addServiceProv(serviceProvider);

            //adding the creance to list
             if(status=="COMPLETED" && creance.creanceStatus==status) this.histories.push(creance);
             else if(status=="UNPAID" && creance.creanceStatus==status) this.creances.push(creance);
            

          }
        }
      }
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
  }


}

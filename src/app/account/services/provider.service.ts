import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Provider, RechargeType } from '../models/provider.model';

const providerUrl = 'http://localhost:8080/api/providers';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  providers: Provider[] = [];




  constructor(private http: HttpClient) { }

  getAll(): Observable<Provider[]> {
    this.providers = [];
    this.getCreditors();
    return of(this.providers);
  }

  getCreditors(): void {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/cmi-soap/creanciersList', true);
    const sr =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cre="http://www.ebanking.ensa/accountservice/Soap/Request/CreanciersList/">
            <soapenv:Header/>
            <soapenv:Body>
                <cre:CreanciersListRequest>?</cre:CreanciersListRequest>
            </soapenv:Body>
          </soapenv:Envelope>`;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {


          const creanciers = xmlhttp.responseXML?.getElementsByTagName('ns2:creancier');
          console.log('>>', xmlhttp.responseXML)
          for (let i = 0; i < creanciers?.length!; i++) {

            console.log(parseInt(creanciers?.item(i)?.childNodes[0].textContent!));
            console.log(creanciers?.item(i)?.childNodes[1].textContent);
            console.log(creanciers?.item(i)?.childNodes[2].textContent);
            console.log(parseInt(creanciers?.item(i)?.childNodes[3].childNodes[0].textContent!));
            console.log(creanciers?.item(i)?.childNodes[3].childNodes[1].textContent);
            console.log(creanciers?.item(i)?.childNodes[3].childNodes[2].textContent);
            console.log(creanciers?.item(i)?.childNodes[3].childNodes[3].textContent);

            let creancierCode = parseInt(creanciers?.item(i)?.childNodes[0].textContent!);
            let creancierName = creanciers?.item(i)?.childNodes[1].textContent;
            let category = (creanciers?.item(i)?.childNodes[2].textContent)?.toLocaleLowerCase();
            let code = parseInt(creanciers?.item(i)?.childNodes[3].childNodes[0].textContent!);
            let image = creanciers?.item(i)?.childNodes[3].childNodes[1].textContent;
            let name = creanciers?.item(i)?.childNodes[3].childNodes[2].textContent;
            let surname = creanciers?.item(i)?.childNodes[3].childNodes[3].textContent;

            let providerIndex = this.providers.findIndex((provider: Provider) => provider.code == code && provider.category == category);
            if (providerIndex != -1) {
              if (this.providers[providerIndex].category === "recharge") {
                let rechargeType = new RechargeType(creancierCode, creancierName!);
                this.providers[providerIndex].addRechargeType(rechargeType);
              } else {
                if (this.providers[providerIndex].products?.findIndex(p => p == creancierName) == -1) {
                  this.providers[providerIndex].addProduct(creancierName!);
                }
              }
            } else {
              let provider = new Provider(code, name!, image!, category!, surname!);
              if (provider.category === "recharge") {
                provider.addProduct("Téléphonie et internet SIM");
                provider.addProduct("Fiber");
                let rechargeType = new RechargeType(creancierCode, creancierName!);
                provider.addRechargeType(rechargeType);
              } else {
                if (provider.products?.findIndex(p => p == creancierName) == -1) {
                  provider.addProduct(creancierName!);
                }
              }
              this.providers.push(provider);
            }


          }
        }
      }
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
  }




  findBySurname(surname: String | undefined): Provider | undefined {
    return this.providers.find(provider => provider.surname == surname);
  }

  public recharge(recharge: any) {
    // return this.http.post(providerUrl + 'recharge', recharge);
    return of(true);
  }



}

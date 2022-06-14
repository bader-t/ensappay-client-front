import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Creance } from '../models/creance.model';
import { Provider, RechargeType } from '../models/provider.model';

const paimentUrl = 'http://localhost:8080/cmi-rest/';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  providers: Provider[] = [];
  histories: Creance[] = [];
  creances: Creance[] = [];
  profileId: number;


  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.profileId = this.tokenStorageService.getClient().id;
  }

  getAll(): Observable<Provider[]> {
    this.providers = [];
    this.getCreditors();
    return of(this.providers);
  }

  getHistories() {
    this.histories = [];
    this.getCreances("COMPLETED", null);
    return of(this.histories);
  }

  getFactures(code: number) {
    this.creances = [];
    this.getCreances("UNPAID", code);
    return of(this.creances);
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
          for (let i = 0; i < creanciers?.length!; i++) {

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
                if (this.providers[providerIndex].rechargeTypes?.findIndex(r => r.code == rechargeType.code) == -1) {
                  this.providers[providerIndex].addRechargeType(rechargeType);
                }
              } else {
                if (this.providers[providerIndex].products?.findIndex(p => p == creancierName) == -1) {
                  this.providers[providerIndex].addProduct(creancierName!);
                }
              }
            } else {
              let provider = new Provider(code, name!, image!, category!, surname!);
              if (provider.category === "recharge") {
                provider.addProduct("Téléphonie et internet SIM");
                let rechargeType = new RechargeType(creancierCode, creancierName!);
                if (provider.rechargeTypes?.findIndex(r => r.code == rechargeType.code) == -1) {
                  provider.addRechargeType(rechargeType);
                }
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


  getCreances(status: string, codeI: number | null): void {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/cmi-soap/creancesList', true);
    const sr =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cre="http://www.ebanking.ensa/accountservice/Soap/Request/CreancesList/">
            <soapenv:Header/>
            <soapenv:Body>
                <cre:CreancesListRequest>
                  <cre:profileId>
                    `+ this.profileId + `
                  </cre:profileId>
                </cre:CreancesListRequest>
            </soapenv:Body>
          </soapenv:Envelope>`;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {


          const creances = xmlhttp.responseXML?.getElementsByTagName('ns2:creance');


          for (let i = 0; i < creances?.length!; i++) {

            let code = parseInt(creances?.item(i)?.childNodes[0].textContent!);
            let dueDate = creances?.item(i)?.childNodes[1].textContent!;
            let amount = parseFloat(creances?.item(i)?.childNodes[2].textContent!);
            let creanceStatus = creances?.item(i)?.childNodes[3].textContent!;

            let creancierName = creances?.item(i)?.childNodes[4].childNodes[1].textContent!;
            let creancierCategory = creances?.item(i)?.childNodes[4].childNodes[2].textContent!;

            let providerCode = parseInt(creances?.item(i)?.childNodes[4].childNodes[3].childNodes[0].textContent!);
            let providerImage = creances?.item(i)?.childNodes[4].childNodes[3].childNodes[1].textContent!;
            let providerName = creances?.item(i)?.childNodes[4].childNodes[3].childNodes[2].textContent!;
            let providerSurname = creances?.item(i)?.childNodes[4].childNodes[3].childNodes[3].textContent!;

            let provider = new Provider(providerCode, providerName, providerImage, creancierCategory, providerSurname);
            let creance = new Creance(code, dueDate, amount, creanceStatus, creancierName, provider);

            if (status == "COMPLETED" && creance.creanceStatus == status) this.histories.push(creance);
            else if (status == "UNPAID" && creance.creanceStatus == status) {
              if (creance.provider?.code == codeI) {
                this.creances.push(creance);
              }
            };
          }
        }
      }
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
  }




  findBySurname(surname: string, category: string): Provider | undefined {
    return this.providers.find(provider => (provider.surname).toLowerCase() == surname?.toLocaleLowerCase() && provider.category == category);
  }

  findProvider(code: number): Provider | undefined {
    return this.providers.find(provider => provider.code == code);
  }

  public recharge(recharge: any) {
    return this.http.post(paimentUrl + 'pay-recharge', recharge);
  }
  public donation(donation: any) {
    return this.http.post(paimentUrl + 'pay-donation', donation);
  }
  public facture(facture: any) {
    return this.http.post(paimentUrl + 'pay-facture', facture);
  }

  public otp(code: any) {
    // return this.http.post(providerUrl + 'otp', code);
    return of(true);
  }



}

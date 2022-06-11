import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Provider } from '../models/provider.model';
const providerUrl = 'http://localhost:8080/api/providers';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {


  providers: Provider[] = [
    {
      image: "https://halberdbastion.com/sites/default/files/2017-08/Maroc-Telecom-Logo.png",
      name: "Maroc Télécome",
      products: [
        "Téléphonie et internet SIM", "Fiber"
      ],
      category: "recharge",
      surname: "iam"

    },
    {
      image: "https://www.marocemploi.cc/storage/files/ma/68/thumb-816x460-369c557388a7b34f87e6ae42fe50d9d6.jpg",
      name: "Inwi",
      products: [
        "Téléphonie et internet SIM", "Fiber"
      ],
      category: "recharge",
      surname: "inwi"
    },
    {
      image: "https://www.adipsys.com/wp-content/uploads/2018/11/Logo-Orange-emea.png",
      name: "Orange",
      products: [
        "Téléphonie et internet SIM", "Fiber"
      ],
      category: "recharge",
      surname: "orange"
    },
  ];


  constructor(private http: HttpClient) { }

  getAll(): Observable<Provider[]> {
    // return this.http.get<Provider[]>(providerUrl);
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
          for (let i = 0; i < creanciers?.length!; i++) {
            console.log(xmlhttp.responseXML?.getElementsByTagName('ns2:creancier').item(i)?.childNodes[0].textContent)
            console.log(xmlhttp.responseXML?.getElementsByTagName('ns2:creancier').item(i)?.childNodes[1].textContent)
            console.log(xmlhttp.responseXML?.getElementsByTagName('ns2:creancier').item(i)?.childNodes[2].textContent)
            console.log(xmlhttp.responseXML?.getElementsByTagName('ns2:creancier').item(i)?.childNodes[3].childNodes[0].textContent)
            console.log(xmlhttp.responseXML?.getElementsByTagName('ns2:creancier').item(i)?.childNodes[3].childNodes[1].textContent)
            console.log('---------')

          }
        }
      }
    }
    console.log("before send")
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

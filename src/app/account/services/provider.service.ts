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

  findBySurname(surname: String | undefined): Provider | undefined {
    return this.providers.find(provider => provider.surname == surname);
  }

}

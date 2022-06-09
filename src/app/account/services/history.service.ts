import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { History } from '../models/history.model';

const historyUrl = 'http://localhost:8080/api/providers';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  histories: History[] = [
    {
      image: "https://halberdbastion.com/sites/default/files/2017-08/Maroc-Telecom-Logo.png",
      provider: "Maroc Télécome",
      title: "Téléphonie et internet SIM",
      category: "recharge",
      amount: 249,
      date: "12-01-2022",
      contractNumber: "0624916360",
      ref: "14948467"

    },
    {
      image: "https://halberdbastion.com/sites/default/files/2017-08/Maroc-Telecom-Logo.png",
      provider: "Maroc Télécome",
      title: "Téléphonie et internet SIM",
      category: "recharge",
      amount: 249,
      date: "12-01-2022",
      contractNumber: "0624916360",
      ref: "14865467"

    },
    {
      image: "https://www.marocemploi.cc/storage/files/ma/68/thumb-816x460-369c557388a7b34f87e6ae42fe50d9d6.jpg",
      provider: "Inwi",
      title: "Téléphonie et internet SIM",
      category: "recharge",
      amount: 50,
      date: "12-01-2022",
      contractNumber: "0624916360",
      ref: "14522467"
    },
    {
      image: "https://www.adipsys.com/wp-content/uploads/2018/11/Logo-Orange-emea.png",
      provider: "Orange",
      title: "Téléphonie et internet SIM",
      category: "recharge",
      amount: 179,
      date: "12-01-2022",
      contractNumber: "0624916360",
      ref: "14565467"
    },
  ];


  constructor(private http: HttpClient) {

  }

  getAll(): Observable<History[]> {
    // return this.http.get<History[]>(historyUrl);
    return of(this.histories);
  }
}

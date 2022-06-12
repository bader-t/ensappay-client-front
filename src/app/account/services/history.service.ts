import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Creance } from '../models/creance.model';
import { History } from '../models/history.model';

const historyUrl = 'http://localhost:8080/api/providers';
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


  constructor(private http: HttpClient) {

  }

  getAll(): Observable<History[]> {
    // return this.http.get<History[]>(historyUrl);
    return of(this.histories);
  }
}

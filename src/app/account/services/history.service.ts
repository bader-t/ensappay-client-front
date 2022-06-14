import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Creance } from '../models/creance.model';
import { History } from '../models/history.model';

const historyUrl = 'http://localhost:8080/api/histories';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  histories: Creance[] = [];



  constructor(private http: HttpClient) {

  }

  // getAll(status: string): Observable<History[]> {
  //   this.getCre(status);
  //   if (status == "COMPLETED") return of(this.histories);
  //   else return of(this.creances);
  // }




}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { History } from '../../models/history.model';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  histories: History[] = [];


  MarocTLC_URL: string = "https://halberdbastion.com/sites/default/files/2017-08/Maroc-Telecom-Logo.png";
  Inwi_URL: string = "https://www.marocemploi.cc/storage/files/ma/68/thumb-816x460-369c557388a7b34f87e6ae42fe50d9d6.jpg";
  Orange_URL: string = "https://www.adipsys.com/wp-content/uploads/2018/11/Logo-Orange-emea.png";


  constructor(private historyService: HistoryService, private alertService: AlertService, private router: Router) { }


  ngOnInit(): void {
    this.getAllHistories();
  }

  getAllHistories(): void {
    this.historyService.getAll().subscribe({
      next: (data: any) => {
        this.histories = data;
      },
      error: (e: any) => {
        this.alertService.error(e.error.message);
      },
      complete: () => {
      }
    })
  }


}

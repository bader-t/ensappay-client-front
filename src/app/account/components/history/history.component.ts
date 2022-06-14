import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Creance } from '../../models/creance.model';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  histories: Creance[] = [];




  constructor(private providerService: ProviderService, private alertService: AlertService, private router: Router) { }


  ngOnInit(): void {
    this.getAllHistories();
  }

  getAllHistories(): void {
    this.providerService.getHistories().subscribe({
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

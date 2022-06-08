import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }


  MarocTLC_URL:string = "https://halberdbastion.com/sites/default/files/2017-08/Maroc-Telecom-Logo.png";
  Inwi_URL:string = "https://www.marocemploi.cc/storage/files/ma/68/thumb-816x460-369c557388a7b34f87e6ae42fe50d9d6.jpg";
  Orange_URL:string = "https://www.adipsys.com/wp-content/uploads/2018/11/Logo-Orange-emea.png";


  ngOnInit(): void {
  }

}

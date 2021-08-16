import { Component, OnInit } from '@angular/core';
import { AppInfoService } from '../shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(public appInfo: AppInfoService) { }

  ngOnInit() {

  }
  }

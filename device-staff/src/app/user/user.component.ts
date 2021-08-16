import { Component, OnInit, ViewChild } from '@angular/core';
import { AppInfoService } from '../shared/services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(public appInfo: AppInfoService) { }

  ngOnInit() {

  }
  }

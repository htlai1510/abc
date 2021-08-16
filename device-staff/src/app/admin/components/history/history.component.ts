import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../../../services/tracking.service';
import { DeviceService } from '../../../services/device.service';
import { StaffService } from '../../../services/staff.service';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from "devextreme/data/data_source";
import { AuthService } from '../../../shared/services';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {
  dataSource: DataSource;
  staffTracking: any;
  deviceTracking: any;
  currentUser: any;
  statusValue: any;

  constructor(private trackingService: TrackingService,
    private staffService: StaffService,
    private deviceService: DeviceService,
    private authService: AuthService) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: () => this.trackingService.getData()
          .toPromise()
          .catch(() => { throw 'Data loading error' }),
      })
    })
  }


  ngOnInit(): void {
    this.staffService.getData().subscribe(staff => {
      this.staffTracking = staff
    })

    this.deviceService.getData().subscribe(device => {
      this.deviceTracking = device
    })

    this.authService.getUser().then((data) => {
      this.currentUser = data['fullname']
    })

    this.statusValue = this.trackingService.getStatus()
  }
}

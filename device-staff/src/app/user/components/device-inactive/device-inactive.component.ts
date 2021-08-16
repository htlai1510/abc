import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from '../../../services/device.service';
import { BrandService } from '../../../services/brand.service';
import { ProductTypeService } from '../../../services/product-type.service';
import { StaffService } from '../../../services/staff.service';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from "devextreme/data/data_source";
import notify from 'devextreme/ui/notify'
import { AuthService } from '../../../shared/services';
import { TrackingService } from '../../../services/tracking.service';
import { environment } from 'src/environments/environment';
import { DxDataGridComponent } from 'devextreme-angular';
import { custom } from 'devextreme/ui/dialog';


@Component({
  selector: 'app-device-inactive',
  styleUrls: ['./device-inactive.component.scss'],
  templateUrl: './device-inactive.component.html',
  providers: [DeviceService, BrandService, ProductTypeService, TrackingService]
})

export class DeviceInactiveComponent implements OnInit {
  dataSource: DataSource;
  brandDevice: any;
  productTypeDevice: any;
  trackingForm: any;
  currentUser: any;
  myDialog: any;
  backendURL = environment.BackEnd;

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;


  constructor(private authService: AuthService,
    private deviceService: DeviceService,
    private brandService: BrandService,
    private productTypeService: ProductTypeService,
    private trackingService: TrackingService
  ) {
    this.authService.getUser().then(user => {
      this.dataSource = new DataSource({
        store: new CustomStore({
          key: 'id',
          load: () => this.deviceService.getDeviceEmptyByUser(user['id'])
            .toPromise()
            .catch(() => { throw 'Data loading error' }),
        })
      })
    })
  }


  BorrowDevice(data: any) {
    this.trackingForm.status = 2;
    this.trackingForm.idDevice = data.id;
    this.trackingForm.idStaff = this.currentUser['id'];
    this.trackingForm.createdBy = this.currentUser['fullname'];
    this.trackingForm.lastUpdatedBy = this.currentUser['fullname'];
    custom({
      showTitle: false,
      messageHtml: "Are you sure you want to borrow this device?",
      buttons: [{
        text: "YES",
        onClick: (e) => { return true }
      },
      {
        text: "NO",
        onClick: (e) => { return false }
      }]
    }).show().then(confirm => {
      if (confirm) {
        this.trackingService.borrowDevice(this.trackingForm)
          .toPromise()
          .then(
            () => {
              this.dataSource.reload();
              notify('Success', 'success');
            },
            () => {
              notify('Failed', 'error');
            }
          )
      }
    })
  }



  ngOnInit(): void {
    this.authService.getUser().then((data) => {
      this.currentUser = data
    })

    this.trackingForm = this.trackingService.getTrackingForm();

    this.brandService.getData().subscribe(branch => {
      this.brandDevice = branch
    })

    this.productTypeService.getData().subscribe(productType => {
      this.productTypeDevice = productType
    })
  }
}

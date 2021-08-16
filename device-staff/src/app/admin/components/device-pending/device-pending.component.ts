import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from '../../../services/device.service';
import { BrandService } from '../../../services/brand.service';
import { ProductTypeService } from '../../../services/product-type.service';
import { StaffService } from '../../../services/staff.service';
import { TrackingService } from '../../../services/tracking.service';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from "devextreme/data/data_source";
import notify from 'devextreme/ui/notify'
import { AuthService } from '../../../shared/services';
import { environment } from 'src/environments/environment';
import { LocationService } from '../../../services/location.service';
import { confirm, custom } from 'devextreme/ui/dialog';



@Component({
  selector: 'app-device-pending',
  templateUrl: './device-pending.component.html',
  styleUrls: ['./device-pending.component.scss']
})

export class DevicePendingComponent implements OnInit {
  dataSource: DataSource;
  brandDevice: any;
  productTypeDevice: any;
  locationDevice: any;
  staffDevice: any;
  deviceDevice: any;
  currentUser: any;
  valueForm: any;
  gridByDevice: any;
  isPopupVisibleDetail: any;
  closeButtonOptions: any;
  trackingForm: any;
  userAssignee: any;
  rowData: any;
  backendURL = environment.BackEnd;


  constructor(private deviceService: DeviceService,
    private brandService: BrandService,
    private productTypeService: ProductTypeService,
    private staffService: StaffService,
    private trackingService: TrackingService,
    private authService: AuthService,
    private locationService: LocationService) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: () => this.deviceService.getDeviceBorrow()
          .toPromise()
          .catch(() => { throw 'Data loading error' }),
      })
    })
  }


  AcceptBorrow(data: any) {
    this.trackingForm.idDevice = data.id;
    this.trackingForm.lastUpdatedBy = this.currentUser;
    custom({
      showTitle: false,
      messageHtml: "Do you agree to lend " + data.name + " to " + data.fullname + "?",
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
        this.trackingService.acceptBorrow(data.idTracking, this.trackingForm)
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

  Remove(data: any) {
    custom({
      showTitle: false,
      messageHtml: "Are you sure you want to delete this request?",
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
        this.trackingService.RemoveRequest(data.idTracking)
          .toPromise()
          .then(
            () => {
              this.dataSource.reload();
              notify('Remove success', 'success');
            },
            () => {
              notify('Remove failed', 'error');
            }
          )
      }
    })
  }

 
  ngOnInit(): void {
    this.authService.getUser().then((data) => {
      this.currentUser = data['fullname']
    })
    this.deviceService.getDeviceBorrow().subscribe(d => {
      this.deviceDevice = d
    });
    this.brandService.getData().subscribe(brand => {
      this.brandDevice = brand
    });
    this.productTypeService.getData().subscribe(productType => {
      this.productTypeDevice = productType
    });
    this.staffService.getData().subscribe(staff => {
      this.staffDevice = staff
    });
    this.locationService.getLocation().subscribe(location => {
      this.locationDevice = location
      console.warn(location)
    });

    this.trackingForm = this.trackingService.getTrackingForm();

  }

}

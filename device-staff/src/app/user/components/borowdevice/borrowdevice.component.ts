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


@Component({
  selector: 'app-borrowdevice',
  styleUrls: ['./borowdevice.component.scss'],
  templateUrl: './borrowdevice.component.html'
})

export class BorrowDeviceComponent implements OnInit {

  borrowForm: any;
  productTypeDevice: any;
  statusValue: any;
  currentUser: string;
  loading: boolean;



  constructor(private authService: AuthService,
    private deviceService: DeviceService,
    private trackingService: TrackingService,
    private productService: ProductTypeService) {
    this.loading = false;
    this.borrowForm = this.trackingService.getBorrowForm();
  }

  formSubmit(e: Event) {
    e.preventDefault();
    this.loading = true;
    if (this.borrowForm.amount == 0) {
      notify('Amount is not zero', 'error');
      this.loading = false;
    }
    else {
      this.borrowForm.user = this.currentUser;
      console.warn(this.borrowForm)
      this.trackingService.borrowDevice(this.borrowForm)
        .toPromise()
        .then(
          () => {
            notify('Success', 'success')
          },
          () => {
            this.loading = false
            notify('Failed', 'error')
          }
        )
    }
  }


  ngOnInit(): void {
    this.authService.getUser().then((data) => {
      this.currentUser = data['id']
    })

    this.productService.getData().subscribe(productType =>
      this.productTypeDevice = productType)
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from '../../../services/device.service';
import { BrandService } from '../../../services/brand.service';
import { ProductTypeService } from '../../../services/product-type.service';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from "devextreme/data/data_source";
import notify from 'devextreme/ui/notify'
import { AuthService } from '../../../shared/services';
import { TrackingService } from '../../../services/tracking.service';
import { environment } from 'src/environments/environment';
import { DxDataGridComponent } from 'devextreme-angular';
import { custom } from 'devextreme/ui/dialog';

@Component({
  selector: 'app-device-pending',
  templateUrl: './device-pending.component.html',
  styleUrls: ['./device-pending.component.scss'],
})
export class DevicePendingComponent implements OnInit {
  dataSource: DataSource;
  brandDevice: any;
  productTypeDevice: any;
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
          load: () => this.deviceService.GetDeviceBorrowingByUser(user['id'])
            .toPromise()
            .catch(() => { throw 'Data loading error' }),
        })
      })
    })
  }

  Confirm(data: any) {
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

    this.brandService.getData().subscribe(branch => {
      this.brandDevice = branch
    })

    this.productTypeService.getData().subscribe(productType => {
      this.productTypeDevice = productType
    })
  }
}

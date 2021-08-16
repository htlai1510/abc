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


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})

export class DeviceComponent implements OnInit {
  dataSource: DataSource;
  brandDevice: any;
  productTypeDevice: any;
  backendURL = environment.BackEnd;

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
          load: () => this.deviceService.getDeviceUsingByUser(user['id'])
            .toPromise()
            .catch(() => { throw 'Data loading error' }),

          remove: (key) => this.trackingService.endTaskDevice(key)
            .toPromise()
            .then(
              () => {
                notify('End task success', 'success')
                this.dataSource.reload();
              },
              () => { notify('End task failed', 'error') }
            ),
        })
      })
    })
    
  }



  ngOnInit(): void {
    this.brandService.getData().subscribe(brand => {
      this.brandDevice = brand
    })

    this.productTypeService.getData().subscribe(productType => {
      this.productTypeDevice = productType
    })


  }
}

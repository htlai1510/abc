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
import { DxDataGridComponent } from 'devextreme-angular';
import { LocationService } from '../../../services/location.service';
import { DeviceEmptyComponent } from '../device-empty/device-empty.component';




@Component({
  selector: 'app-device-using',
  templateUrl: './device-using.component.html',
  styleUrls: ['./device-using.component.scss']
})

export class DeviceUsingComponent implements OnInit {
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
  statusValue: any;
  closeButtonOptions: any;
  backendURL = environment.BackEnd;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;



  constructor(private deviceService: DeviceService,
    private brandService: BrandService,
    private productTypeService: ProductTypeService,
    private staffService: StaffService,
    private trackingService: TrackingService,
    private authService: AuthService,
    private locationService: LocationService) {
    const that = this;
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: () => this.deviceService.getDeviceUsing()
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

    this.closeButtonOptions = {
      text: "Close",
      onClick: function (e) {
        that.dataGrid.instance.clearSelection();
        that.isPopupVisibleDetail = false;
      }
    };
  }

  onUpdateRow(e) {
    e.newData.lastUpdatedBy = this.currentUser;
  }

  onInitNewRow(e) {
    e.data.createdBy = this.currentUser;
    e.data.lastUpdatedBy = this.currentUser;
  }

  selectionChanged(data: any) {
    if (data.selectedRowKeys.length > 0) {
      this.deviceService.getDevice(data.selectedRowKeys).subscribe(device => {
        this.valueForm = device
      })
      this.trackingService.getByDevice(data.selectedRowKeys).subscribe(gridDevice => {
        this.gridByDevice = gridDevice
      })
      this.dataGrid.instance.clearSelection()
      this.isPopupVisibleDetail = true;
    }
  }


  ngOnInit(): void {
    this.authService.getUser().then((data) => {
      this.currentUser = data['fullname']
    })
    this.deviceService.getDeviceUsing().subscribe(device => {
      this.deviceDevice = device
    });
    this.brandService.getData().subscribe(branch => {
      this.brandDevice = branch
    });
    this.productTypeService.getData().subscribe(productType => {
      this.productTypeDevice = productType
    });
    this.staffService.getData().subscribe(staff => {
      this.staffDevice = staff
    });
    this.locationService.getLocation().subscribe(location => {
      this.locationDevice = location
    });
    this.statusValue = this.trackingService.getStatus()
  }

}

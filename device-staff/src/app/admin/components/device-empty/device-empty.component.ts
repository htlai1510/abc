import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
import { DxDataGridComponent, DxTreeViewComponent } from 'devextreme-angular';


@Component({
  selector: 'app-device-empty',
  templateUrl: './device-empty.component.html',
  styleUrls: ['./device-empty.component.scss']
})

export class DeviceEmptyComponent implements OnInit {

  dataSource: DataSource;
  brandDevice: any;
  productTypeDevice: any;
  isPopupVisible: boolean;
  trackingForm: any;
  staffDevice: any;
  deviceDevice: any;
  currentUser: any;
  isPopupVisibleDetail: any;
  valueForm: any;
  gridByDevice: any;
  statusValue: any;
  closeButtonOptions: any;
  loading: boolean;
  backendURL = environment.BackEnd;
  @ViewChild('uploadedImage') uploadedImageRef: HTMLImageElement;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  treeview: any;
  dropdown: any;
  selectionMode: string = 'multiple';


  showStaffByGender(gender) {
    this.staffService.findByGender(gender).subscribe(data => {
      this.treeview = data
    })
  }

  constructor(private authService: AuthService,
    private deviceService: DeviceService,
    private brandService: BrandService,
    private productTypeService: ProductTypeService,
    private staffService: StaffService,
    private trackingService: TrackingService
  ) {
    const that = this;
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: () => this.deviceService.getDeviceEmpty()
          .toPromise()
          .catch(() => { throw 'Data loading error' }),

        insert: (values) => this.deviceService.addDevice(values)
          .toPromise()
          .then(
            () => {
              this.dataSource.reload();
              notify('Insertion success', 'success')
            },
            () => { notify('Insertion failed', 'error') }
          ),

        update: (key, values) => this.deviceService.updateDevice(key, values)
          .toPromise()
          .then(
            () => {
              this.dataSource.reload();
              notify('Update success', 'success')
            },
            () => {
              notify('Update failed', 'error')
            }
          ),

        remove: (key) => this.deviceService.deleteDevice(key)
          .toPromise()
          .then(
            () => {
              this.dataSource.reload();
              notify('Remove success', 'success')

            },
            () => { notify('Remove failed', 'error') }
          ),
      })
    })

    this.staffService.getData().subscribe(staff => {
      this.treeview = staff;
      this.dropdown = staff;
    })


    this.isPopupVisible = false
    this.isPopupVisibleDetail = false
    this.loading = false;
    this.trackingForm = this.deviceService.getTrackingForm();

    this.closeButtonOptions = {
      text: "Close",
      onClick: function (e) {
        that.dataGrid.instance.clearSelection();
        that.isPopupVisibleDetail = false;
      }
    };
  }


  onValueChanged(e: any): void {
    const reader: FileReader = new FileReader();
    reader.onload = (args) => {
      if (typeof args.target.result === 'string') {
        this.uploadedImageRef.src = args.target.result;
      }
    };
    reader.readAsDataURL(e.value[0]);
  }

  onUploaded(e: any, data: any): void {
    data.setValue('images/device/' + e.file.name);
  }

  onUploadError(e: any): void {
    const xhttp = e.request;
    if (xhttp.status === 400) {
      e.message = e.error.responseText;
    }
    if (xhttp.readyState === 4 && xhttp.status === 0) {
      e.message = 'Connection refused';
    }
  }


  useDevice() {
    this.isPopupVisible = true;
  }

  closeButtonClick() {
    this.isPopupVisible = false;
  }

  getValueTreeview(idStaff) {
    console.warn(idStaff)
    this.trackingForm.idStaff = idStaff[0]
  }

  formSubmit(e: Event, idDevice) {
    e.preventDefault();
    this.loading = true;
    this.trackingForm.lastUpdatedBy = this.currentUser;
    this.trackingForm.createdBy = this.currentUser;
    this.trackingForm.idDevice = idDevice;
    this.trackingService.addTracking(this.trackingForm)
      .toPromise()
      .then(
        () => {
          this.dataSource.reload();
          notify('Success', 'success');
        },
        () => {
          this.loading = false;
          notify('Failed', 'error');
        }
      )

    this.isPopupVisible = false;
  }

  selectionChanged(data: any) {
    if (data.selectedRowKeys.length > 0) {
      this.deviceService.getDevice(data.selectedRowKeys).subscribe(device => {
        this.valueForm = device
      })
      this.trackingService.getByDevice(data.selectedRowKeys).subscribe(gridDevice => {
        this.gridByDevice = gridDevice
      })
      this.isPopupVisibleDetail = true;
    }
  }


  onInitNewRow(e) {
    e.data.createdBy = this.currentUser;
    e.data.lastUpdatedBy = this.currentUser;
  }

  onUpdateRow(e) {
    e.newData.lastUpdatedBy = this.currentUser;
  }

  ngOnInit(): void {
    this.authService.getUser().then((data) => {
      this.currentUser = data['fullname']
    })

    this.brandService.getData().subscribe(branch => {
      this.brandDevice = branch
    })

    this.productTypeService.getData().subscribe(productType => {
      this.productTypeDevice = productType
    })

    this.staffService.getData().subscribe(staff => {
      this.staffDevice = staff
    })

    this.deviceService.getDeviceEmpty().subscribe(device => {
      this.deviceDevice = device
    })

    this.statusValue = this.trackingService.getStatus()

  }
}

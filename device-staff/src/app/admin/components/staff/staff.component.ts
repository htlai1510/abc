import { Component, NgModule, ViewChild } from '@angular/core';
import { StaffService } from '../../../services/staff.service';
import { PositionService } from '../../../services/position.service';
import notify from 'devextreme/ui/notify'
import CustomStore from 'devextreme/data/custom_store';
import DataSource from "devextreme/data/data_source";
import { AuthService } from '../../../shared/services';
import { environment } from 'src/environments/environment';
import { LocationService } from '../../../services/location.service';
import { DxTreeViewComponent } from 'devextreme-angular';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})

export class StaffComponent {
  dataSource: DataSource;
  roomStaff: any;
  locationStaff: any;
  floorStaff: any;
  positionStaff: any;
  genderStaff: any;
  belongStaff: any;
  currentUser: any;
  treeview: any;
  treeBoxValue: any;
  phonePattern: any = /^0[0-9]{9,10}$/;
  backendURL = environment.BackEnd;
  idStaff: any;
  @ViewChild(DxTreeViewComponent, { static: false }) treeView1;
  @ViewChild('uploadedImage') uploadedImageRef: HTMLImageElement;

  constructor(private staffService: StaffService,
    private positionService: PositionService,
    private authService: AuthService,
    private locationService: LocationService) {

    this.dataSource = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: () => this.staffService.getData()
          .toPromise()
          .catch(() => { throw 'Data loading error' }),

        insert: (values) => this.staffService.addStaff(values)
          .toPromise()
          .then(
            () => {
              this.dataSource.reload();
              notify('Insertion success', 'success');
            },
            () => { notify('Insertion failed', 'error'); }
          ),

        remove: (key) => this.staffService.deleteStaff(key)
          .toPromise()
          .then(
            () => {
              this.dataSource.reload();
              notify('Delete success', 'success');
            },
            () => { notify('Delete failed', 'error'); }
        ),

        update: (key, values) => this.staffService.updateStaff(key, values)
          .toPromise()
          .then(
            () => {
              this.dataSource.reload();
              notify('Update succees', 'success');
              if (key == this.idStaff) {
                window.location.reload();
              }
            },
            () => { notify('Update failed', 'error');
            }
          )
      }),
    })
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
    data.setValue('images/staff/' + e.file.name);
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


  onUpdateRow(e) {
    e.newData.lastUpdatedBy = this.currentUser;
  }


  onInitNewRow(e) {
    e.data.createdBy = this.currentUser;
    e.data.lastUpdatedBy = this.currentUser;
  }


  syncTreeViewSelection() {
    var component =  (this.treeView1 && this.treeView1.instance);

    if (!component) return;

    if (!this.treeBoxValue) {
      component.unselectAll();
    }

    if (this.treeBoxValue) {
      this.treeBoxValue.forEach((function (value) {
        component.selectItem(value);
      }).bind(this));
    }
  }

  treeView_itemSelectionChanged(e) {
    this.treeBoxValue = e.component.getSelectedNodeKeys();
  }



  ngOnInit(): void
  {
    this.positionService.getData().subscribe(position => {
      this.positionStaff = position;
    });

    this.locationService.getLocation().subscribe(location => {
      this.locationStaff = location;
    });

    this.genderStaff = this.staffService.getGender();

    this.authService.getUser().then((data) => {
      this.currentUser = data['fullname'];
      this.idStaff = data['id'];
    });

    this.locationService.getData().subscribe(data => {
      this.treeview = data
    })
  }
}


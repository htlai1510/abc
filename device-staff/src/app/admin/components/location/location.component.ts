import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from "devextreme/data/data_source";
import notify from 'devextreme/ui/notify'
import { LocationService } from '../../../services/location.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  dataSource: DataSource;
  currentUser: any;

  constructor(
    private locationService: LocationService,
    private authService: AuthService) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: () => this.locationService.getData()
          .toPromise()
          .catch(() => { throw 'Data loading error' }),

        insert: (values) => this.locationService.addLocation(values)
          .toPromise()
          .then(
            () => {
              notify('Insertion success', 'success')
              this.dataSource.reload();
            },
            () => { notify('Insertion failed', 'error') }
          ),

        update: (key, values) => this.locationService.updateLocation(key, values)
          .toPromise()
          .then(
            () => {
              notify('Update success', 'success')
              this.dataSource.reload();
            },
            () => { notify('Update failed', 'error') }
          ),

        remove: (key) => this.locationService.deleteLocation(key)
          .toPromise()
          .then(
            () => {
              notify('Remove success', 'success')
              this.dataSource.reload();
            },
            () => { notify('Remove failed', 'error') }
          ),
      })
    })
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
  }

}

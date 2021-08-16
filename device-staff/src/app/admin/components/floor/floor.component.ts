import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify'
import CustomStore from 'devextreme/data/custom_store';
import DataSource from "devextreme/data/data_source";
import { AuthService } from '../../../shared/services';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {

  dataSource: DataSource;
  currentUser: any;

  constructor(private authService: AuthService,
    private locationService: LocationService) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: () => this.locationService.getFloor()
          .toPromise()
          .catch(() => { throw 'Data loading error' }),
        insert: (values) => locationService.addLocation(values)
          .toPromise()
          .then(
            () => {
              console.warn(values)
              this.dataSource.reload();
              notify('Insertion success', 'success')
            },
            () => { notify('Insertion failed', 'error') }
          ),

        update: (key, values) => locationService.updateLocation(key, values)
          .toPromise()
          .then(
            () => {
              this.dataSource.reload();
              notify('Update success', 'success')
            },
            () => { notify('Update failed', 'error') }
          ),

        remove: (key) => locationService.deleteLocation(key)
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
  }


  onInitNewRow(e) {
    e.data.createdBy = this.currentUser;
    e.data.lastUpdatedBy = this.currentUser;
    e.data.level = 1;
  }



  ngOnInit(): void {
    this.authService.getUser().then((data) => {
      this.currentUser = data['fullname']
    })
  }

}

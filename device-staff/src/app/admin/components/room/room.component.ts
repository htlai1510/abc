import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify'
import CustomStore from 'devextreme/data/custom_store';
import DataSource from "devextreme/data/data_source";
import { AuthService } from '../../../shared/services';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})

export class RoomComponent implements OnInit {
  dataSource: DataSource;
  floorBelong: any;
  roomBelong: any;
  currentUser: any;

  constructor(private authService: AuthService,
    private locationService: LocationService) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: () => this.locationService.getRoom()
          .toPromise()
          .catch(() => { throw 'Data loading error' }),

        insert: (values) => this.locationService.addLocation(values)
          .toPromise()
          .then(
            () => {
              this.dataSource.reload();
              console.warn(values);
              notify('Insertion success', 'success')
            },
            () => { notify('Insertion failed', 'error') }
          ),

        remove: (key) => this.locationService.deleteLocation(key)
          .toPromise()
          .then(
            () => {
              this.dataSource.reload();
              notify('Delete success', 'success')
            },
            () => { notify('Delete failed', 'error') }
          ),

        update: (key, values) => this.locationService.updateLocation(key, values)
          .toPromise()
          .then(
            () => {
              this.dataSource.reload();
              notify('Update success', 'success')
            },
            () => {
              notify('Update failed', 'error')
            }
          )
      }),
    })
  }


  onInitNewRow(e) {
    e.data.createdBy = this.currentUser;
    e.data.lastUpdatedBy = this.currentUser;
    e.data.level = 2;
  }

  ngOnInit(): void {
    this.locationService.getFloor().subscribe(floor => {
      this.floorBelong = floor
    })
    this.authService.getUser().then((data) => {
      this.currentUser = data['fullname']
    })
  }

}

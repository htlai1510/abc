import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../../services/position.service';
import notify from 'devextreme/ui/notify'
import CustomStore from 'devextreme/data/custom_store';
import DataSource from "devextreme/data/data_source";
import { AuthService } from '../../../shared/services';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})

export class PositionComponent implements OnInit {
  dataSource: DataSource;
  currentUser: any;

  constructor(private positionService: PositionService,
    private authService: AuthService) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: () => positionService.getData()
          .toPromise()
          .catch(() => { throw 'Data loading error' }),

        insert: (values) => positionService.addPosition(values)
          .toPromise()
          .then(
            () => {
              notify('Insertion success', 'success')
              this.dataSource.reload();
            },
            () => { notify('Insertion failed', 'error') }
          ),

        remove: (key) => positionService.deletePosition(key)
          .toPromise()
          .then(
            () => {
              notify('Delete success', 'success')
              this.dataSource.reload();
            },
            () => { notify('Delete failed', 'error') }
          ),

        update: (key, values) => positionService.updatePosition(key, values)
          .toPromise()
          .then(
            () => {
              notify('Update succees', 'success')
              this.dataSource.reload();
            },
            () => { notify('Update failed', 'error') }
          )
      }),
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

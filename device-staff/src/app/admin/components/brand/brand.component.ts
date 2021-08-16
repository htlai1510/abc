import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services';
import { BrandService } from '../../../services/brand.service';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from "devextreme/data/data_source";
import notify from 'devextreme/ui/notify'


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  dataSource: DataSource;
  currentUser: any;

  constructor(private brandService: BrandService,
    private authService: AuthService) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: () => brandService.getData()
          .toPromise()
          .catch(() => { throw 'Data loading error' }),

        insert: (values) => brandService.addBrand(values)
          .toPromise()
          .then(
            () => {
              notify('Insertion success', 'success')
              this.dataSource.reload();
              console.warn(values)
            },
            () => { notify('Insertion failed', 'error') }
          ),

        update: (key, values) => brandService.updateBrand(key, values)
          .toPromise()
          .then(
            () => {
              notify('Update success', 'success')
              this.dataSource.reload();
              console.warn(values)
            },
            () => { notify('Update failed', 'error') }
          ),

        remove: (key) => brandService.deleteBrand(key)
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

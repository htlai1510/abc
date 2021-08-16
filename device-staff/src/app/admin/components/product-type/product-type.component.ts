import { Component } from '@angular/core';
import { ProductTypeService } from '../../../services/product-type.service';
import notify from 'devextreme/ui/notify'
import CustomStore from 'devextreme/data/custom_store';
import DataSource from "devextreme/data/data_source";
import { AuthService } from '../../../shared/services';

@Component({
  selector: 'app-product-type',
  templateUrl: 'product-type.component.html',
  styleUrls: ['product-type.component.scss']
})

export class ProductTypeComponent {
  dataSource: DataSource;
  currentUser: any;


  constructor(private productTypeService: ProductTypeService,
    private authService: AuthService) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: () => productTypeService.getData()
          .toPromise()
          .catch(() => { throw 'Data loading error' }),

        insert: (values) => productTypeService.addProductType(values)
          .toPromise()
          .then(
            () => {
              notify('Insertion success', 'success')
              this.dataSource.reload();
            },
            () => { notify('Insertion failed', 'error') }
          ),

        remove: (key) => productTypeService.deleteProductType(key)
          .toPromise()
          .then(
            () => {
              notify('Delete success', 'success')
              this.dataSource.reload();
            },
            () => { notify('Delete failed', 'error') }
          ),

        update: (key, values) => productTypeService.updateProductType(key, values)
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

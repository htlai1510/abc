import { NgModule, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxCheckBoxComponent, DxCheckBoxModule, DxDropDownBoxModule, DxRadioGroupModule, DxTreeViewComponent, DxTreeViewModule } from 'devextreme-angular';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-user-dropdown',
  styleUrls: ['./user-dropdown.component.scss'],
  templateUrl: './user-dropdown.component.html'
})

export class UserDropdownComponent{

  @ViewChild(DxTreeViewComponent, { static: false }) treeView;

  treeBoxValue: any;
  gender: any[] = [
    { key: "0", value: "Male" },
    { key: "1", value: "Female" },
    { key: "2", value: "All" }];


  @Output() selectedRadio = new EventEmitter<any>();
  @Output() selectedTreeview = new EventEmitter<any>();
  @Input() treeDataSource: any;
  @Input() dropDownDataSource: any;


  handleValueChange(e) {
    this.selectedRadio.emit(e.value['key']);
  };

  syncTreeViewSelection(e) {
    var component = (e && e.component) || (this.treeView && this.treeView.instance);

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
  syncTreeViewSelection1() {
    var component = (this.treeView && this.treeView.instance);

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
    this.selectedTreeview.emit(this.treeBoxValue);

  }

  constructor(private staffService: StaffService) {
  }
}


@NgModule({
  imports: [
    DxTreeViewModule,
    DxDropDownBoxModule,
    DxRadioGroupModule,
  ],
  declarations: [UserDropdownComponent],
  exports: [UserDropdownComponent]
})
export class UserDropdownModule { }

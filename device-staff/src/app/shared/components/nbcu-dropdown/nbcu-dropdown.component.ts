import { CommonModule } from '@angular/common';
import { NgModule, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxCheckBoxModule, DxDropDownBoxModule, DxRadioGroupModule, DxTreeViewComponent, DxTreeViewModule } from 'devextreme-angular';

@Component({
  selector: 'app-nbcu-dropdown',
  styleUrls: ['./nbcu-dropdown.component.scss'],
  templateUrl: './nbcu-dropdown.component.html'
})
export class NBCUDropdownComponent {
  @ViewChild(DxTreeViewComponent, { static: false }) treeView: DxTreeViewComponent;

  treeBoxValue: any;
  _selectionMode: string;
  checkBoxMode: string;

  @Output() onSelectionChange = new EventEmitter<any>();
  @Input() dataSource: any;
  @Input() keyExpr: string;
  @Input() displayExpr: string;
  @Input() selectAllText: string = "Select All";

  @Input() public set isSingle(mode: boolean) {
    if (mode) {
      this._selectionMode = 'single';
      this.checkBoxMode = 'none';
    }
    else {
      this._selectionMode = 'multiple';
      this.checkBoxMode = 'selectAll';
    }
  }


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

  syncDropdownSelection() {
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
    this.onSelectionChange.emit(this.treeBoxValue);
  }

}


@NgModule({
  imports: [
    DxTreeViewModule,
    DxDropDownBoxModule,
    DxRadioGroupModule,
    DxCheckBoxModule,
    CommonModule
  ],
  declarations: [NBCUDropdownComponent],
  exports: [NBCUDropdownComponent]
})
export class NBCUDropdownModule { }

import { CommonModule } from '@angular/common';
import {  Component, Input } from '@angular/core';
import { custom } from 'devextreme/ui/dialog';
import { NBCUHorizontalTabComponent } from '../nbcu-horizontal-tab/nbcu-horizontal-tab.component';

@Component({
  selector: 'app-nbcu-horizontal-tabs',
  styleUrls: ['./nbcu-horizontal-tabs.component.scss'],
  templateUrl: './nbcu-horizontal-tabs.component.html'
})
export class NBCUHorizontalTabsComponent {
  tabs: NBCUHorizontalTabComponent[] = [];
  _useNotify: boolean;
  _message: string = "Are you sure you want to change tab?"

  @Input()
  public set useNotify(use: boolean) {
    this._useNotify = use;
  }

  @Input()
  public set notify(mess: string) {
    this._message = mess;
  }

  addTab(tab: NBCUHorizontalTabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab: NBCUHorizontalTabComponent) {
    if (this._useNotify) {
      if (!tab.active) {
        custom({
          showTitle: false,
          messageHtml: this._message,
          buttons: [{
            text: "YES",
            onClick: (e) => { return true }
          },
          {
            text: "NO",
            onClick: (e) => { return false }
          }]
        }).show().then(confirm => {
          if (confirm) {
            this.tabs.forEach((tab) => {
              tab.active = false;
            });
            tab.active = true;
          }
        })
      }
    }
    else {
      this.tabs.forEach((tab) => {
        tab.active = false;
      });
      tab.active = true;
    } 
  }
}


import { Component, Input } from '@angular/core';
import { NBCUHorizontalTabsComponent } from '../nbcu-horizontal-tabs/nbcu-horizontal-tabs.component';

@Component({
  selector: 'app-nbcu-horizontal-tab',
  template: `
   <div [hidden]="!active">
      <ng-content></ng-content>
   </div>
  `
})
export class NBCUHorizontalTabComponent {
  @Input() tabTitle;

  active: boolean;
  
  constructor(tabs: NBCUHorizontalTabsComponent) {
    tabs.addTab(this);
  }
  
}





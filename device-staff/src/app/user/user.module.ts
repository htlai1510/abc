import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UserComponent } from './user.component';
import { Userrouting } from './user.routing'
import { SideNavOuterToolbarUserModule } from '../layouts/side-nav-outer-toolbar-user/side-nav-outer-toolbar-user.component'
import { SideNavOuterToolbarModule } from '../layouts'
import { DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDropDownBoxModule, DxFormModule, DxTreeListModule, DxTreeViewModule } from 'devextreme-angular';
import { FooterModule } from '../shared/components';
import { AuthGuardService } from '../shared/services';
import { InformationComponent } from './components/information/information.component';
import { BorrowDeviceComponent } from './components/borowdevice/borrowdevice.component';
import { AuthUser } from '../shared/services/auth.user';
import { DeviceComponent } from './components/device/device.component';
import { DeviceInactiveComponent } from './components/device-inactive/device-inactive.component';
import { DevicePendingComponent } from './components/device-pending/device-pending.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { NBCUDropdownModule } from '../shared/components/nbcu-dropdown/nbcu-dropdown.component';
import { NBCUHorizontalTabsComponent } from '../shared/components/nbcu-horizontal-tabs/nbcu-horizontal-tabs.component';
import { NBCUHorizontalTabComponent } from '../shared/components/nbcu-horizontal-tab/nbcu-horizontal-tab.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UserComponent,
    DeviceComponent,
    InformationComponent,
    BorrowDeviceComponent,
    DeviceInactiveComponent,
    DevicePendingComponent,
    DropdownComponent,
    NBCUHorizontalTabsComponent,
    NBCUHorizontalTabComponent],
  imports: [
    BrowserModule,
    CommonModule,
    DxCheckBoxModule,
    Userrouting,
    SideNavOuterToolbarUserModule,
    SideNavOuterToolbarModule,
    DxFormModule,
    FooterModule,
    DxDataGridModule, 
    DxButtonModule,
    DxTreeViewModule,
    DxDropDownBoxModule,
    DxTreeListModule,
    NBCUDropdownModule,
  ],
  providers: [AuthGuardService, AuthUser],
  bootstrap: [UserComponent]
})
export class UserModule { }

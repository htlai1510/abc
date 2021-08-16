import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AdminRouting } from './admin.routing'
import { SideNavOuterToolbarModule } from '../layouts'
import { AdminComponent } from './admin.component';
import { DxButtonModule, DxDataGridModule, DxDropDownBoxModule, DxFileUploaderModule, DxFormModule, DxListModule, DxPieChartModule, DxPopupModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxModule, DxTextBoxModule, DxTreeListModule, DxTreeViewModule } from 'devextreme-angular';
import { BrandComponent } from './components/brand/brand.component';
import { DeviceEmptyComponent } from './components/device-empty/device-empty.component';
import { RoomComponent } from './components/room/room.component';
import { FloorComponent } from './components/floor/floor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryComponent } from './components/history/history.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { PositionComponent } from './components/position/position.component';
import { StaffComponent } from './components/staff/staff.component';
import { DeviceUsingComponent } from './components/device-using/device-using.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterModule } from '../shared/components';
import { AuthGuardService } from '../shared/services';
import { AuthAdmin } from '../shared/services/auth.admin';
import { DevicePendingComponent } from './components/device-pending/device-pending.component';
import { LocationComponent } from './components/location/location.component';
import { FormsModule } from '@angular/forms';
import { UserDropdownModule } from './components/user-dropdown/user-dropdown.component';
import { NBCUDropdownModule } from '../shared/components/nbcu-dropdown/nbcu-dropdown.component';


@NgModule({
  declarations: [
    AdminComponent,
    BrandComponent,
    RoomComponent,
    FloorComponent,
    DashboardComponent,
    HistoryComponent,
    ProductTypeComponent,
    PositionComponent,
    StaffComponent,
    DeviceUsingComponent,
    DeviceEmptyComponent,
    ProfileComponent,
    DevicePendingComponent,
    LocationComponent,
  ],
  imports: [
    BrowserModule,
    AdminRouting,
    SideNavOuterToolbarModule,
    DxDataGridModule,
    DxPieChartModule,
    DxFileUploaderModule,
    DxFormModule,
    DxScrollViewModule,
    DxPopupModule,
    DxButtonModule,
    FooterModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxListModule,
    DxTreeViewModule,
    DxDropDownBoxModule,
    DxTreeListModule,
    FormsModule,
    DxRadioGroupModule,
    UserDropdownModule,
    NBCUDropdownModule
  ],
  providers: [AuthGuardService, AuthAdmin],
  bootstrap: [AdminComponent]
})

export class AdminModule { }

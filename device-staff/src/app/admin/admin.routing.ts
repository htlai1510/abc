import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrandComponent } from './components/brand/brand.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { FloorComponent } from './components/floor/floor.component';
import { RoomComponent } from './components/room/room.component';
import { StaffComponent } from './components/staff/staff.component';
import { PositionComponent } from './components/position/position.component';
import { HistoryComponent } from './components/history/history.component';
import { DeviceUsingComponent } from './components/device-using/device-using.component';
import { DeviceEmptyComponent } from './components/device-empty/device-empty.component';
import { AuthGuardService } from '../shared/services';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthAdmin } from '../shared/services/auth.admin';
import { DevicePendingComponent } from './components/device-pending/device-pending.component';
import { LocationComponent } from './components/location/location.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: 'location',
        component: LocationComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: 'device-pending',
        component: DevicePendingComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: 'brand',
        component: BrandComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: 'product-type',
        component: ProductTypeComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: 'floor',
        component: FloorComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: 'room',
        component: RoomComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: 'staff',
        component: StaffComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: 'position',
        component: PositionComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: 'history',
        component: HistoryComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: 'device-using',
        component: DeviceUsingComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: 'device-empty',
        component: DeviceEmptyComponent,
        canActivate: [AuthGuardService, AuthAdmin]
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];


export const AdminRouting = RouterModule.forRoot(routes, { useHash: true });

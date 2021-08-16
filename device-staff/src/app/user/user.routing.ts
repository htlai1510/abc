import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuardService, AuthService } from '../shared/services';
import { BorrowDeviceComponent } from './components/borowdevice/borrowdevice.component';
import { AuthUser } from '../shared/services/auth.user';
import { InformationComponent } from './components/information/information.component';
import { DeviceComponent } from './components/device/device.component';
import { DeviceInactiveComponent } from './components/device-inactive/device-inactive.component';
import { DevicePendingComponent } from './components/device-pending/device-pending.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: '',
        component: InformationComponent,
        canActivate: [AuthGuardService, AuthUser]
      },
      {
        path: 'dropdown',
        component: DropdownComponent,
        canActivate: [AuthGuardService, AuthUser]
      },
      {
        path: 'device',
        component: DeviceComponent,
        canActivate: [AuthGuardService, AuthUser]
      },
      {
        path: 'device-inactive',
        component: DeviceInactiveComponent,
        canActivate: [AuthGuardService, AuthUser]
      },
      {
        path: 'information',
        component: InformationComponent,
        canActivate: [AuthGuardService, AuthUser]
      },
      {
        path: 'borrow',
        component: BorrowDeviceComponent,
        canActivate: [AuthGuardService, AuthUser]
      },
      {
        path: 'device-pending',
        component: DevicePendingComponent,
        canActivate: [AuthGuardService, AuthUser]
      },
      

      {
        path: '**',
        redirectTo: 'information'
      }
    ]
  }
];


export const Userrouting = RouterModule.forRoot(routes, { useHash: true });

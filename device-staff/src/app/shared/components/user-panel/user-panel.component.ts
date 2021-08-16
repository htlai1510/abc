import { Component, NgModule, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-user-panel',
  templateUrl: 'user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})

export class UserPanelComponent {
  @Input()
  menuItems: any;

  @Input()
  menuMode!: string;

  staff: any;
  BackEnd = environment.BackEnd;


  constructor(private authService: AuthService) {
    this.authService.getUser().then(data =>
      this.staff = data)
  }
}



@NgModule({
  imports: [
    DxListModule,
    DxContextMenuModule,
    CommonModule
  ],
  declarations: [UserPanelComponent],
  exports: [UserPanelComponent]
})
export class UserPanelModule { }

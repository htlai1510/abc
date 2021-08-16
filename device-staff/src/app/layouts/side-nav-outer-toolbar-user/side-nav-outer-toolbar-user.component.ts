import { Component, OnInit, NgModule, Input, ViewChild } from '@angular/core';
import { HeaderModule} from '../../shared/components/';
import { SideNavigationMenuUserModule } from '../../shared/components/side-navigation-menu-user/side-navigation-menu-user.component';
import { ScreenService } from '../../shared/services';
import { ItemClickEvent } from 'devextreme/ui/tree_view';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import { DxScrollViewModule, DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';
import { CommonModule } from '@angular/common';

import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-side-nav-outer-toolbar-user',
  templateUrl: './side-nav-outer-toolbar-user.component.html',
  styleUrls: ['./side-nav-outer-toolbar-user.component.scss']
})
export class SideNavOuterToolbarUserComponent implements OnInit {
  @ViewChild(DxScrollViewComponent, { static: true }) scrollView!: DxScrollViewComponent;
  selectedRoute = '';

  menuOpened!: boolean;
  temporaryMenuOpened = false;

  @Input()
  title!: string;
  message!: string;


  menuMode = 'shrink';
  menuRevealMode = 'expand';
  minMenuSize = 0;
  shaderEnabled = false;

  constructor(private screen: ScreenService, private router: Router) { }

  ngOnInit() {
    console.warn(this.message)
    this.menuOpened = this.screen.sizes['screen-large'];

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.selectedRoute = val.urlAfterRedirects.split('?')[0];
      }
    });

    this.screen.changed.subscribe(() => this.updateDrawer());

    this.updateDrawer();
  }

  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    this.menuMode = isLarge ? 'shrink' : 'overlap';
    this.menuRevealMode = isXSmall ? 'slide' : 'expand';
    this.minMenuSize = isXSmall ? 0 : 60;
    this.shaderEnabled = !isLarge;
  }

  get hideMenuAfterNavigation() {
    return this.menuMode === 'overlap' || this.temporaryMenuOpened;
  }

  get showMenuAfterClick() {
    return !this.menuOpened;
  }

  navigationChanged(event: ItemClickEvent) {
    const path = event.itemData.path;
    const pointerEvent = event.event;

    if (path && this.menuOpened) {
      if (event.node?.selected) {
        pointerEvent?.preventDefault();
      } else {
        this.router.navigate([path]);
        this.scrollView.instance.scrollTo(0);
      }

      if (this.hideMenuAfterNavigation) {
        this.temporaryMenuOpened = false;
        this.menuOpened = false;
        pointerEvent?.stopPropagation();
      }
    } else {
      pointerEvent?.preventDefault();
    }
  }

  navigationClick() {
    if (this.showMenuAfterClick) {
      this.temporaryMenuOpened = true;
      this.menuOpened = true;
    }
  }
}

@NgModule({
  imports: [SideNavigationMenuUserModule, DxDrawerModule, HeaderModule, DxScrollViewModule, CommonModule ],
  exports: [ SideNavOuterToolbarUserComponent ],
  declarations: [ SideNavOuterToolbarUserComponent ]
})
export class SideNavOuterToolbarUserModule { }

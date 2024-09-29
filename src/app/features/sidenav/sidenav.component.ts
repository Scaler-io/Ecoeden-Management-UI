import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getMobileViewState} from 'src/app/state/mobile-view/mobile-view.selector';
import {getSidenavToggleState} from 'src/app/state/sidenav/sidenav.selector';
import {AppState} from 'src/app/store/app.state';

import * as sidenavToggleAction from '../../state/sidenav/sidenav.action';

@Component({
  selector: 'ecoeden-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  public sidenavExpanded: boolean;
  public isMobileView: boolean;
  public subMenuList = {
    users: false,
    products: false
  };

  constructor(private store: Store<AppState>) {}

  private subscriptions = {
    sidenavToggleState: null,
    mobileViewState: null
  };

  ngOnInit(): void {
    this.subscriptions.sidenavToggleState = this.store.pipe(select(getSidenavToggleState)).subscribe(state => {
      this.sidenavExpanded = state;
      if (!state) {
        this.subMenuList = {
          ...this.subMenuList,
          users: false,
          products: false
        };
      }
    });
    this.subscriptions.mobileViewState = this.store.pipe(select(getMobileViewState)).subscribe(state => {
      this.isMobileView = state;
    });
  }

  public handleSidenavItemClick(menu?: string) {
    if (menu && menu === 'users') {
      this.subMenuList = {
        ...this.subMenuList,
        users: !this.subMenuList.users,
        products: false
      };
    }
    if (menu && menu === 'products') {
      this.subMenuList = {
        ...this.subMenuList,
        users: false,
        products: !this.subMenuList.products
      };
    }
    !this.isMobileView && !this.sidenavExpanded && this.store.dispatch(new sidenavToggleAction.ToggleSideNav());
  }

  public hadndleSubmenuClick() {
    this.isMobileView && !this.sidenavExpanded && this.store.dispatch(new sidenavToggleAction.ToggleSideNav());
  }

  ngOnDestroy(): void {
    if (this.subscriptions.sidenavToggleState) {
      this.subscriptions.sidenavToggleState.unsubscribe();
    }
    if (this.subscriptions.mobileViewState) {
      this.subscriptions.mobileViewState.unsubscribe();
    }
  }
}

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
    products: false,
    suppliers: false,
    customers: false,
    units: false
  };

  private subscriptions = {
    sidenavToggleState: null,
    mobileViewState: null
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscriptions.sidenavToggleState = this.store.pipe(select(getSidenavToggleState)).subscribe(state => {
      this.sidenavExpanded = state;
      if (!state) {
        this.subMenuList = {
          ...this.subMenuList,
          users: false,
          products: false,
          suppliers: false,
          customers: false,
          units: false
        };
      }
    });

    this.subscriptions.mobileViewState = this.store.pipe(select(getMobileViewState)).subscribe(state => {
      this.isMobileView = state;
    });
  }

  public handleSidenavItemClick(menu?: string) {
    if (menu) this.updateSubmenuActions(menu);
    if (!this.isMobileView && !this.sidenavExpanded) {
      this.store.dispatch(new sidenavToggleAction.ToggleSideNav());
    }
  }

  public hadndleSubmenuClick() {
    if (this.isMobileView && !this.sidenavExpanded) {
      this.store.dispatch(new sidenavToggleAction.ToggleSideNav());
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions.sidenavToggleState) {
      this.subscriptions.sidenavToggleState.unsubscribe();
    }
    if (this.subscriptions.mobileViewState) {
      this.subscriptions.mobileViewState.unsubscribe();
    }
  }

  private updateSubmenuActions(menu: string): void {
    switch (menu) {
      case 'users':
        this.subMenuList = {
          ...this.subMenuList,
          users: !this.subMenuList.users,
          products: false,
          suppliers: false,
          customers: false,
          units: false
        };
        break;
      case 'products':
        this.subMenuList = {
          ...this.subMenuList,
          users: false,
          products: !this.subMenuList.products,
          suppliers: false,
          customers: false,
          units: false
        };
        break;
      case 'suppliers':
        this.subMenuList = {
          ...this.subMenuList,
          users: false,
          products: false,
          suppliers: !this.subMenuList.suppliers,
          customers: false,
          units: false
        };
        break;
      case 'customers':
        {
          this.subMenuList = {
            ...this.subMenuList,
            users: false,
            products: false,
            suppliers: false,
            customers: !this.subMenuList.customers,
            units: false
          };
        }
        break;
      case 'units':
        this.subMenuList = {
          ...this.subMenuList,
          users: false,
          products: false,
          suppliers: false,
          customers: false,
          units: !this.subMenuList.units
        };
        break;
      default:
        break;
    }
  }
}

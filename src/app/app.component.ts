import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';

import * as mobileViewActions from './state/mobile-view/mobile-view.action';

@Component({
  selector: 'ecoeden-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Ecoeden-Management-UI';
  public isMobileView: boolean = false;

  constructor(private store: Store<AppState>) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const window = event.currentTarget as Window;
    if (window.innerWidth < 499 && !this.isMobileView) {
      this.store.dispatch(new mobileViewActions.SetMobileView(true));
      this.isMobileView = true;
    } else if (window.innerWidth > 499 && this.isMobileView) {
      this.store.dispatch(new mobileViewActions.SetMobileView(false));
      this.isMobileView = false;
    }
  }

  ngOnInit(): void {
    this.chekIfMobileView();
  }

  private chekIfMobileView(): void {
    if ((window as Window).innerWidth < 499) {
      this.isMobileView = true;
      this.store.dispatch(new mobileViewActions.SetMobileView(true));
    } else {
      this.isMobileView = false;
      this.store.dispatch(new mobileViewActions.SetMobileView(false));
    }
  }
}

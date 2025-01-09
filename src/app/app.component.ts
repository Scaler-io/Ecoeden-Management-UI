import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.state';

import * as mobileViewActions from './state/mobile-view/mobile-view.action';
import * as authActions from './state/auth/auth.action';
import {AuthService} from './core/auth/auth.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'ecoeden-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = 'Ecoeden-Management-UI';
  public isMobileView: boolean = false;
  public isAuthenticated: boolean = false;
  public isAppBusy: boolean = true;
  private subscriptions = {
    authState: null
  };

  constructor(
    private auth: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && this.router.url === '/') {
        this.isAppBusy = true;
      } else {
        setTimeout(() => {
          this.isAppBusy = false;
        }, 2000);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const window = event.currentTarget as Window;
    if (window.innerWidth < 576 && !this.isMobileView) {
      this.store.dispatch(new mobileViewActions.SetMobileView(true));
      this.isMobileView = true;
    } else if (window.innerWidth > 576 && this.isMobileView) {
      this.store.dispatch(new mobileViewActions.SetMobileView(false));
      this.isMobileView = false;
    }
  }

  ngOnInit(): void {
    this.chekIfMobileView();
    this.performAuthentcation();
  }

  ngOnDestroy(): void {
    if (this.subscriptions.authState) this.subscriptions.authState.unsubscribe();
  }

  private chekIfMobileView(): void {
    if ((window as Window).innerWidth < 576) {
      this.isMobileView = true;
      this.store.dispatch(new mobileViewActions.SetMobileView(true));
    } else {
      this.isMobileView = false;
      this.store.dispatch(new mobileViewActions.SetMobileView(false));
    }
  }

  private performAuthentcation(): void {
    this.subscriptions.authState = this.auth.isAuthenticated().subscribe(response => {
      this.isAuthenticated = response.isAuthenticated;
      if (!response.isAuthenticated) {
        this.auth.authorize();
      } else {
        this.store.dispatch(new authActions.SetAuthState(response));
      }
    });
  }
}

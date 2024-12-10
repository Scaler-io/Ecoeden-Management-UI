import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {select, Store} from '@ngrx/store';
import {getMobileViewState} from 'src/app/state/mobile-view/mobile-view.selector';
import {AppState} from 'src/app/store/app.state';
import {ToggleSideNav} from '../../../state/sidenav/sidenav.action';
import {AuthUser} from 'src/app/core/models/auth-user';
import {getLoggedInUser} from 'src/app/state/auth/auth.selector';
import {AuthService} from 'src/app/core/auth/auth.service';

@Component({
  selector: 'ecoeden-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;
  @Input() notificationCount: number = 0;

  public isMobileView: boolean;
  public loggedInUser: AuthUser;

  private subcriptions = {
    mobileViewState: null,
    authState: null
  };

  constructor(
    private store: Store<AppState>,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.subcriptions.mobileViewState = this.store.pipe(select(getMobileViewState)).subscribe(state => (this.isMobileView = state));

    this.subcriptions.authState = this.store.pipe(select(getLoggedInUser)).subscribe(state => {
      if (state) this.loggedInUser = state;
    });
  }

  ngOnDestroy(): void {
    if (this.subcriptions.mobileViewState) this.subcriptions.mobileViewState.unsubscribe();
    if (this.subcriptions.authState) this.subcriptions.authState.unsubscribe();
  }

  public toggleAccordion(): void {
    if (this.panel.expanded) this.panel.close();
    else this.panel.open();
  }

  public toggleSidenav(): void {
    this.store.dispatch(new ToggleSideNav());
  }

  public signout() {
    this.auth.signoff();
  }
}

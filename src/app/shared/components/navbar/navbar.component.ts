import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { select, Store } from '@ngrx/store';
import { getMobileViewState } from 'src/app/state/mobile-view/mobile-view.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'ecoeden-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;
  @Input() notificationCount: number = 0;
  public isMobileView: boolean;
  private subcriptions = {
    mobileViewState: null,
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subcriptions.mobileViewState = this.store
      .pipe(select(getMobileViewState))
      .subscribe((state) => (this.isMobileView = state));
  }

  ngOnDestroy(): void {
    if (this.subcriptions.mobileViewState)
      this.subcriptions.mobileViewState.unsubscribe();
  }

  public toggleAccordion(): void {
    if (this.panel.expanded) this.panel.close();
    else this.panel.open();
  }
}

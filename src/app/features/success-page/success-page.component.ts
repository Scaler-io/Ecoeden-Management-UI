import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {ButtonType} from 'src/app/shared/components/button/button.model';
import {RequestPageState} from 'src/app/state/request-page/request-page.reducer';
import {getRequestPageDetails} from 'src/app/state/request-page/request-page.selector';
import {AppState} from 'src/app/store/app.state';

@Component({
  selector: 'ecoeden-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss']
})
export class SuccessPageComponent implements OnInit {
  public requestPage: RequestPageState;
  public nexButtonLabel: string;
  public ButtonType = ButtonType;
  private subscriptions = {
    requestPageDetails: null
  };

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.requestPageDetails = this.store.pipe(select(getRequestPageDetails)).subscribe(value => {
      if (value) {
        this.requestPage = value;
        this.nexButtonLabel =
          value.requestPage === 'user' ? 'Add another user' : value.requestPage === 'supplier' ? 'Add another supplier' : 'Next';
      }
    });
  }

  public previousClick(): void {
    this.router.navigateByUrl(this.requestPage.previousUrl);
  }

  public nextClick(): void {
    this.router.navigateByUrl(this.requestPage.nextUrl);
  }
}

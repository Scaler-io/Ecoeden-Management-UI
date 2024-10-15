import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getUserDetails} from 'src/app/state/user/user.selector';
import {AppState} from 'src/app/store/app.state';
import {BreadcrumbService} from 'xng-breadcrumb';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/core/models/user';
import {combineLatest, delay} from 'rxjs';
import {getLoggedInUser} from 'src/app/state/auth/auth.selector';
import {fadeSlideInOut} from 'src/app/core/animations/fadeInOut';
import * as userActions from '../../../state/user/user.action';
import {BannerType} from 'src/app/shared/components/notice-banner/banner.model';

@Component({
  selector: 'ecoeden-user-detailed-view',
  templateUrl: './user-detailed-view.component.html',
  styleUrls: ['./user-detailed-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeSlideInOut]
})
export class UserDetailedViewComponent implements OnInit, OnDestroy {
  public isBusy: boolean;
  public user: User;
  public isCurrentUser: boolean;
  public hasUserEditPermission: boolean;
  public BannerType = BannerType;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  private subscriptions = {
    authAndUserCombinedState: null
  };

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (param.id) {
        this.isBusy = true;
        this.zone.runOutsideAngular(() => {
          this.store.dispatch(new userActions.UserDetailsFetch(param.id));
        });
      }
    });

    this.subscriptions.authAndUserCombinedState = combineLatest([this.store.pipe(select(getUserDetails)), this.store.pipe(select(getLoggedInUser))])
      .pipe(delay(1000))
      .subscribe(([userResponse, authResponse]) => {
        if (userResponse && authResponse) {
          this.zone.run(() => {
            this.breadcrumbService.set('@username', `${userResponse.firstName} ${userResponse.lastName}`);
            this.user = userResponse;
            this.isBusy = false;
            this.isCurrentUser = authResponse.username === userResponse.userName;
            this.hasUserEditPermission = authResponse.permissions.includes('user:write');
            this.cdr.markForCheck();
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscriptions.authAndUserCombinedState) {
      this.subscriptions.authAndUserCombinedState.unsubscribe();
    }
  }

  public showMinimalData(value: string) {
    if (value.length < 9) return value;
    return value.substring(0, 8) + ' ...';
  }

  public getUserRolePermissionJson(): string {
    const rolePermission = {
      Roles: this.user.userRoles,
      Permissions: this.user.permissions
    };
    return JSON.stringify(rolePermission, null, 2).trim();
  }

  public redirectToEditView(): void {
    this.router.navigate(['users', 'update', this.user.id]);
  }
}

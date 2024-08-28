import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { PaginatedUserList, UserSearchRequest, UserSummary } from 'src/app/core/models/user';
import { getPaginatedUsers } from 'src/app/state/user/user.selector';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationMetaData } from 'src/app/core/models/pagination';
import { PageEvent } from '@angular/material/paginator';
import { TableColumnMap, TableDataSource } from 'src/app/core/models/table-source';
import { delay } from 'rxjs';
import { getLoggedInUser } from 'src/app/state/auth/auth.selector';
import { AuthUser } from 'src/app/core/models/auth-user';

import * as userActions from '../../state/user/user.action';
import { getMobileViewState } from 'src/app/state/mobile-view/mobile-view.selector';

@Component({
  selector: 'ecoeden-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  public dataLength: number;
  public loggedInUser: AuthUser;
  public isPageLoading: boolean = true;
  public paginationMetaData: PaginationMetaData;
  public users = new MatTableDataSource<UserSummary>([]);
  public displayedColumns = [ 'userName', 'fullName', 'email', 'status', 'lastLogin' ];
  public coulumnNameMap: TableColumnMap = {
    userName: { value: 'userName', isDateField: false, isStatusField: false },
    fullName: { value: 'fullName', isDateField: false, isStatusField: false },
    email: { value: 'email', isDateField: false, isStatusField: false },
    status: { value: 'isActive', isDateField: false, isStatusField: true },
    lastLogin: { value: 'lastLogin', isDateField: true, isStatusField: false },
  };
  public isMobileView: boolean;

  private subscriptions = {
    paginatedUsers: null,
    currentUser: null,
    mobileViewState: null
  };

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.dataLength = 9;
    this.zone.runOutsideAngular(() => {
      this.fetchUserList(false, 1, 5); // first time call, with default serach params
    });

    this.subscriptions.currentUser = this.store.pipe(select(getLoggedInUser)).subscribe(response => {
      this.loggedInUser = response;
    })
    this.subscriptions.mobileViewState = this.store.pipe(select(getMobileViewState)).subscribe(response => {
      this.zone.run(() => {
        this.isMobileView = response;
        this.cdr.markForCheck();
      })
    })

    this.subscriptions.paginatedUsers = this.store // fetches serach result, along with page information
      .pipe(select(getPaginatedUsers), delay(1000))
      .subscribe((response) => {
        if (response && response.data.length > 0) {
          this.zone.run(() => {
            this.isPageLoading = false;
            this.processUserResponse(response);
            this.cdr.markForCheck();
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscriptions.paginatedUsers)
      this.subscriptions.paginatedUsers.unsubscribe();
    if(this.subscriptions.mobileViewState)
      this.subscriptions.mobileViewState.unsubscribe();
  }

  // fetch user summary list
  private fetchUserList(
    isFilteredQuery: boolean,
    pageIndex: number,
    pageSize: number,
    sortField: string = 'createdOn',
    sortOrder: string = 'Asc'
  ): void {
    this.isPageLoading = true;
    const userSearchRequest: UserSearchRequest = {
      isFilteredQuery: isFilteredQuery,
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortField: sortField,
      sortOrder: sortOrder,
    };
    this.store.dispatch(new userActions.UserListFetch(userSearchRequest));
  }

  private processUserResponse(response: PaginatedUserList): void {
    this.users.data = response.data;
    this.paginationMetaData = {
      count: response.count,
      currentPage: response.pageIndex,
      top: response.pageSize,
    };
  }

  public pageChange(event: PageEvent) {
    this.zone.runOutsideAngular(() => {
      this.fetchUserList(false, event.pageIndex + 1, event.pageSize);
    });
  }

  public onMobilePageChange(pageIndex: number){
    this.zone.runOutsideAngular(() => {
      this.fetchUserList(false, pageIndex, 5);
    });
  }

  public onVisit(event: TableDataSource) {
    console.log(event);
  }

  public onEdit(event: TableDataSource) {
    console.log(event);
  }

  public onDelete(event: TableDataSource) {
    console.log(event);
  }
}

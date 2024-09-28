import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from 'src/app/store/app.state';
import {PaginatedUserList, UserRoles, UserSearchRequest, UserSummary} from 'src/app/core/models/user';
import {getPaginatedUsers, getUserCount} from 'src/app/state/user/user.selector';
import {MatTableDataSource} from '@angular/material/table';
import {PaginationMetaData} from 'src/app/core/models/pagination';
import {PageEvent} from '@angular/material/paginator';
import {TableColumnMap, TableDataSource} from 'src/app/core/models/table-source';
import {debounceTime, delay, tap} from 'rxjs';
import {getLoggedInUser} from 'src/app/state/auth/auth.selector';
import {AuthUser} from 'src/app/core/models/auth-user';

import * as userActions from '../../state/user/user.action';
import {getMobileViewState} from 'src/app/state/mobile-view/mobile-view.selector';
import {Router} from '@angular/router';
import {fadeSlideInOut} from 'src/app/core/animations/fadeInOut';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ecoeden-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [fadeSlideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  public dataLength: number;
  public loggedInUser: AuthUser;
  public isPageLoading: boolean = true;
  public paginationMetaData: PaginationMetaData;
  public users = new MatTableDataSource<UserSummary>([]);
  public displayedColumns = ['userName', 'fullName', 'email', 'status'];
  public totalUserCount: number;
  public isMobileView: boolean;
  public roleFilters: UserRoles[] = [UserRoles.Admin, UserRoles.Opeartor, UserRoles.Auditor];
  private currentSortField: string;
  public filterPanelOpened: boolean = false;
  public isFilterApplied: boolean;
  public userFilterFormGroup: FormGroup = new FormGroup({
    userRoles: new FormControl('', [Validators.required])
  });

  public coulumnNameMap: TableColumnMap = {
    userName: {value: 'userName', isDateField: false, isStatusField: false},
    fullName: {value: 'fullName', isDateField: false, isStatusField: false},
    email: {value: 'email', isDateField: false, isStatusField: false},
    status: {value: 'isActive', isDateField: false, isStatusField: true}
  };

  private subscriptions = {
    paginatedUsers: null,
    userTotalCountState: null,
    currentUser: null,
    mobileViewState: null
  };

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef, private zone: NgZone, private router: Router) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.store.dispatch(new userActions.UserCountFetch()); // fetch total user list count
      this.fetchUserList(false, 1, 20); // first time call, with default serach params,
    });

    this.subscriptions.currentUser = this.store.pipe(select(getLoggedInUser)).subscribe(response => {
      this.loggedInUser = response;
    });

    this.subscriptions.mobileViewState = this.store.pipe(select(getMobileViewState)).subscribe(response => {
      this.useChangeDetection(() => (this.isMobileView = response));
    });

    this.subscriptions.userTotalCountState = this.store.pipe(select(getUserCount)).subscribe(response => {
      this.dataLength = response;
      this.totalUserCount = response; // used for store a copy
    });

    this.subscriptions.paginatedUsers = this.store.pipe(select(getPaginatedUsers), delay(1000)).subscribe(response => {
      this.useChangeDetection(() => {
        this.isPageLoading = false;
        this.processUserResponse(response);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions.paginatedUsers) this.subscriptions.paginatedUsers.unsubscribe();
    if (this.subscriptions.mobileViewState) this.subscriptions.mobileViewState.unsubscribe();
    if (this.subscriptions.mobileViewState) this.subscriptions.userTotalCountState.unsubscribe();
  }

  public search(search: FormControl) {
    search.valueChanges
      .pipe(
        tap(text => {
          if (text.length > 3 || text.length === 0) this.isPageLoading = true;
          else this.isPageLoading = false;
        }),
        debounceTime(500)
      )
      .subscribe((searchText: string) => {
        if (searchText.length === 0) {
          this.zone.runOutsideAngular(() => {
            !this.isFilterApplied
              ? this.fetchUserList(false, 1, 20)
              : this.fetchUserListWithFilters(this.userFilterFormGroup.value, this.currentSortField);
          });
        }
        if (searchText.length > 3) {
          this.zone.runOutsideAngular(() => {
            !this.isFilterApplied
              ? this.fetchUserList(true, 1, 20, searchText, 'fullName, email,userName')
              : this.fetchUserListWithFilters(
                  {userRoles: this.userFilterFormGroup.value},
                  this.currentSortField,
                  searchText,
                  'fullName, email,userName'
                );
          });
        }
      });
  }

  // fetch user summary list
  private fetchUserList(
    isFilteredQuery: boolean,
    pageIndex: number,
    pageSize: number,
    matchPhrase: string = null,
    matchPhraseField: string = null,
    sortField: string = 'createdOn',
    sortOrder: string = 'Desc'
  ): void {
    this.isPageLoading = true;
    const userSearchRequest: UserSearchRequest = {
      isFilteredQuery: isFilteredQuery,
      pageIndex: pageIndex,
      pageSize: pageSize,
      matchPhrase: matchPhrase,
      matchPhraseField: matchPhraseField,
      sortField: sortField,
      sortOrder: sortOrder
    };
    this.store.dispatch(new userActions.UserListFetch(userSearchRequest));
  }

  // fetch user list with filtered data
  private fetchUserListWithFilters(
    filters: {[key: string]: string},
    sortField: string = 'createdOn',
    matchPhrase: string = '',
    matchPhraseField: string = ''
  ) {
    this.isPageLoading = true;
    const userSearchRequest: UserSearchRequest = {
      isFilteredQuery: true,
      pageIndex: 1,
      pageSize: 20,
      matchPhrase: matchPhrase,
      matchPhraseField: matchPhraseField,
      sortField: sortField,
      sortOrder: 'Desc',
      filters: filters
    };
    this.store.dispatch(new userActions.UserListFetch(userSearchRequest));
  }

  private processUserResponse(response: PaginatedUserList): void {
    this.users.data = response.data;
    this.paginationMetaData = {
      count: response.count,
      currentPage: response.pageIndex,
      top: response.pageSize
    };
  }

  public pageChange(event: PageEvent) {
    this.zone.runOutsideAngular(() => {
      this.fetchUserList(false, event.pageIndex + 1, event.pageSize);
    });
  }

  public onMobilePageChange(pageIndex: number) {
    this.zone.runOutsideAngular(() => {
      this.fetchUserList(false, pageIndex, 10);
    });
  }

  public onVisit(event: TableDataSource) {
    this.router.navigateByUrl(`users/${(event as UserSummary).id}`);
  }

  public onEdit(event: TableDataSource) {
    console.log(event);
  }

  public onDelete(event: TableDataSource) {
    console.log(event);
  }

  public get hasUserUpdatePermission(): boolean {
    return this.loggedInUser.permissions.includes('user:write');
  }

  public sortMenuChanged(sortField: string): void {
    this.currentSortField = sortField;
    this.zone.runOutsideAngular(() => {
      if (!this.isFilterApplied) {
        this.fetchUserList(false, 1, 20, null, null, sortField);
      } else {
        this.fetchUserListWithFilters(this.userFilterFormGroup.value, this.currentSortField);
      }
    });
  }

  public onFilterApply(): void {
    this.isFilterApplied = true;
    this.zone.runOutsideAngular(() => {
      this.fetchUserListWithFilters(this.userFilterFormGroup.value, this.currentSortField);
    });
  }

  public onFilterClear(): void {
    this.isFilterApplied = false;
    this.userFilterFormGroup.patchValue({
      userRoles: ''
    });
    this.userFilterFormGroup.get('userRoles').markAsUntouched();
    this.zone.runOutsideAngular(() => {
      this.fetchUserList(false, 1, 20, '', '', this.currentSortField);
    });
  }

  private useChangeDetection(fn: Function) {
    this.zone.run(() => {
      fn();
      this.cdr.markForCheck();
    });
  }

  public onAddUser(): void {
    this.router.navigate(['users', 'add']);
  }
}

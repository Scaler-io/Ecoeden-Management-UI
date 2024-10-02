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
import {SearchLayoutService} from 'src/app/shared/components/search-layout/search-layout.service';

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
    mobileViewState: null,
    performSearch: null,
    applyFilter: null,
    clearFilter: null,
    changeSortMenu: null,
    addUser: null,
    closeFilterPanel: null
  };

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private router: Router,
    private searchLayoutService: SearchLayoutService
  ) {}

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

    this.performSearch();
    this.applyFilter();
    this.clearFilter();
    this.changeSortMenu();
    this.addUser();
    this.closeFilterPanel();
  }

  ngOnDestroy(): void {
    if (this.subscriptions.paginatedUsers) this.subscriptions.paginatedUsers.unsubscribe();
    if (this.subscriptions.mobileViewState) this.subscriptions.mobileViewState.unsubscribe();
    if (this.subscriptions.mobileViewState) this.subscriptions.userTotalCountState.unsubscribe();
    if (this.subscriptions.performSearch) this.subscriptions.performSearch.unsubscribe();
    if (this.subscriptions.applyFilter) this.subscriptions.applyFilter.unsubscribe();
    if (this.subscriptions.clearFilter) this.subscriptions.clearFilter.unsubscribe();
    if (this.subscriptions.changeSortMenu) this.subscriptions.changeSortMenu.unsubscribe();
    if (this.subscriptions.addUser) this.subscriptions.addUser.unsubscribe();
    if (this.subscriptions.closeFilterPanel) this.subscriptions.closeFilterPanel.unsubscribe();
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
    this.router.navigateByUrl(`users/update/${(event as UserSummary).id}`);
  }

  public onDelete(event: TableDataSource) {
    console.log(event);
  }

  public get hasUserUpdatePermission(): boolean {
    return this.loggedInUser.permissions.includes('user:write');
  }

  // fetch user summary list
  private fetchUserList(
    isFilteredQuery: boolean,
    pageIndex: number,
    pageSize: number,
    matchPhrase: string = null,
    matchPhraseField: string = null,
    sortField: string = 'createdOn',
    sortOrder: string = 'Asc'
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
  ): void {
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

  private performSearch(): void {
    this.subscriptions.performSearch = this.searchLayoutService.searchInput$.subscribe(search => {
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
    });
  }

  private changeSortMenu(): void {
    this.subscriptions.changeSortMenu = this.searchLayoutService.sortChange$.subscribe((sortField: string) => {
      this.currentSortField = sortField;
      this.zone.runOutsideAngular(() => {
        if (!this.isFilterApplied) {
          this.fetchUserList(false, 1, 20, null, null, sortField);
        } else {
          this.fetchUserListWithFilters(this.userFilterFormGroup.value, this.currentSortField);
        }
      });
    });
  }

  private applyFilter(): void {
    this.subscriptions.applyFilter = this.searchLayoutService.filter$.subscribe(() => {
      this.isFilterApplied = true;
      this.zone.runOutsideAngular(() => {
        this.fetchUserListWithFilters(this.userFilterFormGroup.value, this.currentSortField);
      });
    });
  }

  private clearFilter(): void {
    this.subscriptions.clearFilter = this.searchLayoutService.filterClear$.subscribe(() => {
      this.isFilterApplied = false;
      this.userFilterFormGroup.patchValue({
        userRoles: ''
      });
      this.userFilterFormGroup.get('userRoles').markAsUntouched();
      this.zone.runOutsideAngular(() => {
        this.fetchUserList(false, 1, 20, '', '', this.currentSortField);
      });
    });
  }

  private addUser(): void {
    this.subscriptions.addUser = this.searchLayoutService.addNewAction$.subscribe(() => {
      this.router.navigate(['users', 'add']);
    });
  }

  private closeFilterPanel(): void {
    this.subscriptions.closeFilterPanel = this.searchLayoutService.panelClosed$.subscribe((isClosed: boolean) => {
      if (isClosed) {
        this.userFilterFormGroup.reset();
      }
    });
  }

  private useChangeDetection(fn: Function) {
    this.zone.run(() => {
      fn();
      this.cdr.markForCheck();
    });
  }
}

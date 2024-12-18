import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {fadeSlideInOut} from 'src/app/core/animations/fadeInOut';
import {CustomerCommadType, CustomerSearchRequest, CustomerSummary, PaginatedCustomerList} from 'src/app/core/models/customer.model';
import {PaginationMetaData} from 'src/app/core/models/pagination';
import {TableColumnMap, TableDataSource} from 'src/app/core/models/table-source';
import {SearchLayoutService} from 'src/app/shared/components/search-layout/search-layout.service';
import {AppState} from 'src/app/store/app.state';
import * as customerActions from '../../state/customer/customer.action';
import * as requestPageActions from '../../state/request-page/request-page.action';
import {PageEvent} from '@angular/material/paginator';
import {debounceTime, delay, tap} from 'rxjs';
import {ConfirmDialogComponent} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import {DialogData} from 'src/app/core/models/dialog.model';
import {getCustomerCommandResponse, getCustomerCount, getPaginatedCustomers} from 'src/app/state/customer/customer.selector';
import {getMobileViewState} from 'src/app/state/mobile-view/mobile-view.selector';
import {CommandResultStatus} from 'src/app/core/models/common';

@Component({
  selector: 'ecoeden-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: [fadeSlideInOut]
})
export class CustomerComponent implements OnInit, OnDestroy {
  public dataLength: number;
  public isPageLoading: boolean = true;
  public paginationMetaData: PaginationMetaData;
  public customers = new MatTableDataSource<CustomerSummary>([]);
  public displayColumns = ['name', 'email', 'address', 'status'];
  public totalCustomerCount: number;
  public searchTerm: string;
  public isSearchApplied: boolean;
  public isFilterApplied: boolean;
  public filterPanelOpened: boolean;
  public isMobileView: boolean;
  public deletedCustomer: string;
  public customerFilterFormGroup: FormGroup = new FormGroup({
    status: new FormControl('')
  });
  public columnNameMap: TableColumnMap = {
    name: {value: 'name', isDateField: false, isStatusField: false},
    address: {value: 'address', isDateField: false, isStatusField: false},
    email: {value: 'email', isDateField: false, isStatusField: false},
    status: {value: 'status', isDateField: false, isStatusField: true}
  };
  private currentSortField: string;
  private subscriptions = {
    paginatedCustomers: null,
    customerTotalCount: null,
    performSearch: null,
    changeSortMenu: null,
    applyFilter: null,
    clearFilter: null,
    mobileViewState: null,
    customerDeleteCommand: null
  };

  constructor(
    private zone: NgZone,
    private router: Router,
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private searchLayoutService: SearchLayoutService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.noChangeDetection(() => {
      this.fetchCustomerCount(); // fetch total customer list count
      this.fetchCustomers(false, 1, 20); // first time call, with default serach params,
    });

    this.subscriptions.customerTotalCount = this.store.pipe(select(getCustomerCount), delay(1000)).subscribe(response => {
      this.dataLength = response;
      this.totalCustomerCount = response;
    });

    this.subscriptions.paginatedCustomers = this.store.pipe(select(getPaginatedCustomers), delay(1000)).subscribe(response => {
      this.useChangeDetection(() => {
        this.processCustomerResponse(response);
        if (response.data.length === 0) this.isPageLoading = false;
      });
    });

    this.subscriptions.mobileViewState = this.store.pipe(select(getMobileViewState)).subscribe(response => {
      this.useChangeDetection(() => (this.isMobileView = response));
    });

    this.subscriptions.customerDeleteCommand = this.store.pipe(select(getCustomerCommandResponse)).subscribe(response => {
      if (response && response.commandType === CustomerCommadType.Delete) {
        if (response.status === CommandResultStatus.Success) {
          this.store.dispatch(
            new requestPageActions.RequestPageSet({
              heading: `Customer ${this.deletedCustomer} deleted successfully`,
              subheading: 'You can create more or get back to the customer list page',
              nextUrl: 'customers/add',
              previousUrl: 'customers',
              requestPage: 'customers'
            })
          );
          this.router.navigate(['success']);
        } else {
          this.toastr.error('Something went wrong. Please try again later');
        }
        this.store.dispatch(new customerActions.ClearCustomerCommandResult());
      }
    });

    this.addCustomer();
    this.performSearch();
    this.changeSortMenu();
    this.applyFilter();
    this.clearFilter();
  }

  ngOnDestroy(): void {
    if (this.subscriptions.paginatedCustomers) this.subscriptions.paginatedCustomers.unsubscribe();
    if (this.subscriptions.customerTotalCount) this.subscriptions.customerTotalCount.unsubscribe();
    if (this.subscriptions.performSearch) this.subscriptions.performSearch.unsubscribe();
    if (this.subscriptions.changeSortMenu) this.subscriptions.changeSortMenu.unsubscribe();
    if (this.subscriptions.applyFilter) this.subscriptions.applyFilter.unsubscribe();
    if (this.subscriptions.clearFilter) this.subscriptions.clearFilter.unsubscribe();
    if (this.subscriptions.mobileViewState) this.subscriptions.mobileViewState.unsubscribe();
    if (this.subscriptions.customerDeleteCommand) this.subscriptions.customerDeleteCommand.unsubscribe();
  }

  public checkIfAnyControlHasValue(): boolean {
    return Object.values(this.customerFilterFormGroup.controls).some(control => control.value && control.value.trim() !== '');
  }

  public onMobilePageChange(pageIndex: number) {
    this.noChangeDetection(() => {
      if (!this.isFilterApplied) {
        this.fetchCustomers(!!this.searchTerm, pageIndex, 10, this.searchTerm, 'name,email,address', this.currentSortField);
      } else {
        this.fetchCustomersWithFilters(
          this.customerFilterFormGroup.value,
          pageIndex,
          10,
          this.searchTerm,
          'name,email,address',
          this.currentSortField
        );
      }
    });
  }

  public pageChange(event: PageEvent): void {
    this.noChangeDetection(() => {
      if (this.isFilterApplied) {
        this.fetchCustomersWithFilters(
          this.customerFilterFormGroup.value,
          event.pageIndex + 1,
          event.pageSize,
          this.searchTerm,
          'name,address,email',
          this.currentSortField
        );
      } else {
        this.fetchCustomers(
          !!this.searchTerm,
          event.pageIndex + 1,
          event.pageSize,
          this.searchTerm,
          'name,address,email',
          this.currentSortField
        );
      }
    });
  }

  public onVisit(event: TableDataSource): void {
    this.router.navigate(['customers', (event as CustomerSummary).id], {
      state: {customerData: event as CustomerSummary}
    });
  }

  public onUpdate(event: TableDataSource): void {
    this.router.navigate(['customers', 'update'], {
      queryParams: {
        customerId: (event as CustomerSummary).id
      }
    });
  }

  public onDelete(event: TableDataSource): void {
    const customer = event as CustomerSummary;
    this.deletedCustomer = customer.name;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: <DialogData>{
        title: 'Are you sure you want to delete this customer?',
        content: 'Deleting this customer will permanently remove all associated records. This action cannot be undone.',
        primaryActionLabel: 'Delete',
        secondaryActionLabel: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response?.confirm) {
        this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
      }
    });
  }

  private fetchCustomers(
    isFilteredQuery: boolean,
    pageIndex: number,
    pageSize: number,
    matchPhrase: string = null,
    matchPhraseField: string = null,
    sortField: string = 'createdOn',
    sortOrder: string = 'Desc'
  ): void {
    this.isPageLoading = true;
    const customerSearchRequest: CustomerSearchRequest = {
      isFilteredQuery: isFilteredQuery,
      pageIndex: pageIndex,
      pageSize: pageSize,
      matchPhrase: matchPhrase,
      matchPhraseField: matchPhraseField,
      sortField: sortField,
      sortOrder: sortOrder
    };
    this.store.dispatch(new customerActions.GetAllCustomers(customerSearchRequest));
  }

  private fetchCustomersWithFilters(
    filters: {[key: string]: string},
    pageIndex: number,
    pageSize: number,
    matchPhrase: string = '',
    matchPhraseField: string = '',
    sortField: string = 'createdOn',
    sortOrder: string = 'Desc'
  ): void {
    this.isPageLoading = true;
    const customerSearchRequest: CustomerSearchRequest = {
      isFilteredQuery: true,
      pageIndex: pageIndex,
      pageSize: pageSize,
      matchPhrase: matchPhrase,
      matchPhraseField: matchPhraseField,
      sortField: sortField,
      sortOrder: sortOrder,
      filters: filters
    };
    this.store.dispatch(new customerActions.GetAllCustomers(customerSearchRequest));
  }

  private fetchCustomerCount(filters: {[key: string]: string} = null, matchPhrase: string = '', matchPhraseField: string = ''): void {
    if (filters === null && matchPhrase === '' && matchPhraseField === '') {
      this.store.dispatch(new customerActions.GetCustomerCount());
    } else {
      this.store.dispatch(
        new customerActions.GetCustomerCount({
          isFilteredQuery: true,
          pageIndex: 0,
          pageSize: 0,
          matchPhrase: matchPhrase,
          matchPhraseField: matchPhraseField,
          filters: filters
        })
      );
    }
  }

  private processCustomerResponse(response: PaginatedCustomerList): void {
    this.customers.data = response.data;
    this.paginationMetaData = {
      count: response.count,
      currentPage: response.pageIndex,
      top: response.pageSize
    };
  }

  private performSearch(): void {
    this.searchLayoutService.searchInput$.subscribe(search => {
      search.valueChanges
        .pipe(
          tap(text => {
            this.searchTerm = text;
            if (text.length > 3 || text.length === 0) {
              this.isPageLoading = true;
            } else {
              this.isPageLoading = false;
            }
          }),
          debounceTime(500)
        )
        .subscribe((searchText: string) => {
          if (searchText.length === 0) {
            this.noChangeDetection(() => {
              if (!this.isFilterApplied) {
                this.fetchCustomerCount();
                this.fetchCustomers(false, 1, 20, this.searchTerm, 'name,address,email', this.currentSortField);
              } else {
                this.fetchCustomerCount(this.customerFilterFormGroup.value);
                this.fetchCustomersWithFilters(
                  this.customerFilterFormGroup.value,
                  1,
                  20,
                  this.searchTerm,
                  'name,address,email',
                  this.currentSortField
                );
              }
            });
          }
          if (searchText.length > 3) {
            this.noChangeDetection(() => {
              if (!this.isFilterApplied) {
                this.fetchCustomerCount(null, searchText, 'name,address,email');
                this.fetchCustomers(true, 1, 20, searchText, 'name,address,email', this.currentSortField);
              } else {
                this.fetchCustomerCount(this.customerFilterFormGroup.value, searchText, 'name,address,email');
                this.fetchCustomersWithFilters(
                  this.customerFilterFormGroup.value,
                  1,
                  20,
                  searchText,
                  'name,address,email',
                  this.currentSortField
                );
              }
            });
          }
        });
    });
  }

  private changeSortMenu(): void {
    this.subscriptions.changeSortMenu = this.searchLayoutService.sortChange$.subscribe((sortField: string) => {
      this.currentSortField = sortField;
      this.noChangeDetection(() => {
        if (!this.isFilterApplied) {
          this.fetchCustomers(!!this.searchTerm, 1, 20, this.searchTerm, 'name,address,email', sortField);
        } else {
          this.fetchCustomersWithFilters(this.customerFilterFormGroup.value, 1, 20, this.searchTerm, 'name,address,email', sortField);
        }
      });
    });
  }

  private applyFilter(): void {
    this.subscriptions.applyFilter = this.searchLayoutService.filter$.subscribe(() => {
      this.isFilterApplied = true;
      this.noChangeDetection(() => {
        this.fetchCustomerCount(this.customerFilterFormGroup.value, this.searchTerm, 'name,address,email');
        this.fetchCustomersWithFilters(
          this.customerFilterFormGroup.value,
          1,
          20,
          this.searchTerm,
          'name,address,email',
          this.currentSortField
        );
      });
    });
  }

  private clearFilter(): void {
    this.subscriptions.clearFilter = this.searchLayoutService.filterClear$.subscribe(() => {
      this.isFilterApplied = false;
      this.customerFilterFormGroup.reset();
      this.noChangeDetection(() => {
        this.fetchCustomerCount(null, this.searchTerm, 'name,address,email');
        this.fetchCustomers(!!this.searchTerm, 1, 20, this.searchTerm, 'name,address,email', this.currentSortField);
      });
    });
  }

  private addCustomer(): void {
    this.searchLayoutService.addNewAction$.subscribe(() => {
      this.router.navigate(['customers', 'add']);
    });
  }

  private noChangeDetection(fn: Function): void {
    this.zone.runOutsideAngular(() => {
      fn();
    });
  }

  private useChangeDetection(fn: Function): void {
    this.zone.run(() => {
      fn();
      this.cdr.markForCheck();
    });
  }
}

import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {AppState} from 'src/app/store/app.state';
import {ToastrService} from 'ngx-toastr';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {SearchLayoutService} from 'src/app/shared/components/search-layout/search-layout.service';
import {PaginationMetaData} from 'src/app/core/models/pagination';
import {PaginatedSupplierList, SupplierSearchRequest, SupplierSummary} from 'src/app/core/models/supplier';
import {MatTableDataSource} from '@angular/material/table';
import {TableColumnMap, TableDataSource} from 'src/app/core/models/table-source';

import * as supplierActions from '../../state/supplier/supplier.action';
import {getPaginatedSuppliers, getSupplierCount} from 'src/app/state/supplier/supplier.selector';
import {debounceTime, delay, tap} from 'rxjs';
import {fadeSlideInOut} from 'src/app/core/animations/fadeInOut';
import {PageEvent} from '@angular/material/paginator';
import {FormControl, FormGroup} from '@angular/forms';
import {getMobileViewState} from 'src/app/state/mobile-view/mobile-view.selector';

@Component({
  selector: 'ecoeden-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
  animations: [fadeSlideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuppliersComponent implements OnInit, OnDestroy {
  public dataLength: number;
  public isPageLoading: boolean = true;
  public paginationMetaData: PaginationMetaData;
  public suppliers = new MatTableDataSource<SupplierSummary>([]);
  public displayedColumns = ['name', 'email', 'address', 'status'];
  public totalSupplierCount: number;
  public searchTerm: string;
  public isSearchApplied: boolean;
  public isFilterApplied: boolean;
  private currentSortField: string;
  public filterPanelOpened: boolean;
  public isMobileView: boolean;
  public supplierFilterFormGroup: FormGroup = new FormGroup({
    status: new FormControl('')
  });

  public columnNameMap: TableColumnMap = {
    name: {value: 'name', isDateField: false, isStatusField: false},
    address: {value: 'address', isDateField: false, isStatusField: false},
    email: {value: 'email', isDateField: false, isStatusField: false},
    status: {value: 'status', isDateField: false, isStatusField: true}
  };

  constructor(
    private zone: NgZone,
    private router: Router,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private searchLayoutService: SearchLayoutService
  ) {}

  private subscriptions = {
    paginatedSuppliers: null,
    supplierTotalCount: null,
    performSearch: null,
    changeSortMenu: null,
    applyFilter: null,
    clearFilter: null,
    mobileViewState: null
  };

  ngOnInit(): void {
    this.noChangeDetection(() => {
      this.fetchSupplierCount(); // fetch total supplier list count
      this.fetchSuppliers(false, 1, 20); // first time call, with default serach params,
    });

    this.subscriptions.supplierTotalCount = this.store.pipe(select(getSupplierCount)).subscribe(response => {
      this.dataLength = response;
      this.totalSupplierCount = response;
    });

    this.subscriptions.paginatedSuppliers = this.store.pipe(select(getPaginatedSuppliers), delay(1000)).subscribe(response => {
      this.useChangeDetection(() => {
        this.processSupplierResponse(response);
        if (response.data.length === 0) this.isPageLoading = false;
      });
    });

    this.subscriptions.mobileViewState = this.store.pipe(select(getMobileViewState)).subscribe(response => {
      this.useChangeDetection(() => (this.isMobileView = response));
    });

    this.performSearch();
    this.changeSortMenu();
    this.applyFilter();
    this.clearFilter();
  }

  ngOnDestroy(): void {
    if (this.subscriptions.paginatedSuppliers) this.subscriptions.paginatedSuppliers.unsubscribe();
    if (this.subscriptions.supplierTotalCount) this.subscriptions.supplierTotalCount.unsubscribe();
    if (this.subscriptions.performSearch) this.subscriptions.performSearch.unsubscribe();
    if (this.subscriptions.changeSortMenu) this.subscriptions.changeSortMenu.unsubscribe();
    if (this.subscriptions.applyFilter) this.subscriptions.applyFilter.unsubscribe();
    if (this.subscriptions.clearFilter) this.subscriptions.clearFilter.unsubscribe();
    if (this.subscriptions.mobileViewState) this.subscriptions.mobileViewState.unsubscribe();
  }

  private fetchSuppliers(
    isFilteredQuery: boolean,
    pageIndex: number,
    pageSize: number,
    matchPhrase: string = null,
    matchPhraseField: string = null,
    sortField: string = 'createdOn',
    sortOrder: string = 'Desc'
  ): void {
    this.isPageLoading = true;
    const supplierSearchRequest: SupplierSearchRequest = {
      isFilteredQuery: isFilteredQuery,
      pageIndex: pageIndex,
      pageSize: pageSize,
      matchPhrase: matchPhrase,
      matchPhraseField: matchPhraseField,
      sortField: sortField,
      sortOrder: sortOrder
    };
    this.store.dispatch(new supplierActions.GetSuppliers(supplierSearchRequest));
  }

  private fetchSuppliersWithFilters(
    filters: {[key: string]: string},
    pageIndex: number,
    pageSize: number,
    matchPhrase: string = '',
    matchPhraseField: string = '',
    sortField: string = 'createdOn',
    sortOrder: string = 'Desc'
  ): void {
    this.isPageLoading = true;
    const supplierSearchRequest: SupplierSearchRequest = {
      isFilteredQuery: true,
      pageIndex: pageIndex,
      pageSize: pageSize,
      matchPhrase: matchPhrase,
      matchPhraseField: matchPhraseField,
      sortField: sortField,
      sortOrder: sortOrder,
      filters: filters
    };
    this.store.dispatch(new supplierActions.GetSuppliers(supplierSearchRequest));
  }

  private fetchSupplierCount(filters: {[key: string]: string} = null, matchPhrase: string = '', matchPhraseField: string = ''): void {
    if (filters === null && matchPhrase === '' && matchPhraseField === '') {
      this.store.dispatch(new supplierActions.GetSupplierCount());
    } else {
      this.store.dispatch(
        new supplierActions.GetSupplierCount({
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

  private processSupplierResponse(response: PaginatedSupplierList): void {
    this.suppliers.data = response.data;
    this.paginationMetaData = {
      count: response.count,
      currentPage: response.pageIndex,
      top: response.pageSize
    };
  }

  public onMobilePageChange(pageIndex: number) {
    this.noChangeDetection(() => {
      if (!this.isFilterApplied) {
        this.fetchSuppliers(!!this.searchTerm, pageIndex, 10, this.searchTerm, 'name,email,address', this.currentSortField);
      } else {
        this.fetchSuppliersWithFilters(
          this.supplierFilterFormGroup.value,
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
        this.fetchSuppliersWithFilters(
          this.supplierFilterFormGroup.value,
          event.pageIndex + 1,
          event.pageSize,
          this.searchTerm,
          'name,address,email',
          this.currentSortField
        );
      } else {
        this.fetchSuppliers(!!this.searchTerm, event.pageIndex + 1, event.pageSize, this.searchTerm, 'name,address,email', this.currentSortField);
      }
    });
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
                this.fetchSupplierCount();
                this.fetchSuppliers(false, 1, 20, this.searchTerm, 'name,address,email', this.currentSortField);
              } else {
                this.fetchSupplierCount(this.supplierFilterFormGroup.value);
                this.fetchSuppliersWithFilters(
                  this.supplierFilterFormGroup.value,
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
                this.fetchSupplierCount(null, searchText, 'name,address,email');
                this.fetchSuppliers(true, 1, 20, searchText, 'name,address,email', this.currentSortField);
              } else {
                this.fetchSupplierCount(this.supplierFilterFormGroup.value, searchText, 'name,address,email');
                this.fetchSuppliersWithFilters(this.supplierFilterFormGroup.value, 1, 20, searchText, 'name,address,email', this.currentSortField);
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
          this.fetchSuppliers(!!this.searchTerm, 1, 20, this.searchTerm, 'name,address,email', sortField);
        } else {
          this.fetchSuppliersWithFilters(this.supplierFilterFormGroup.value, 1, 20, this.searchTerm, 'name,address,email', sortField);
        }
      });
    });
  }

  private applyFilter(): void {
    this.subscriptions.applyFilter = this.searchLayoutService.filter$.subscribe(() => {
      this.isFilterApplied = true;
      this.noChangeDetection(() => {
        this.fetchSupplierCount(this.supplierFilterFormGroup.value, this.searchTerm, 'name,address,email');
        this.fetchSuppliersWithFilters(this.supplierFilterFormGroup.value, 1, 20, this.searchTerm, 'name,address,email', this.currentSortField);
      });
    });
  }

  private clearFilter(): void {
    this.subscriptions.clearFilter = this.searchLayoutService.filterClear$.subscribe(() => {
      this.isFilterApplied = false;
      this.supplierFilterFormGroup.reset();
      this.noChangeDetection(() => {
        this.fetchSupplierCount(null, this.searchTerm, 'name,address,email');
        this.fetchSuppliers(!!this.searchTerm, 1, 20, this.searchTerm, 'name,address,email', this.currentSortField);
      });
    });
  }

  public onVisit(event: TableDataSource): void {
    this.router.navigate(['suppliers', (event as SupplierSummary).id], {
      state: {supplierData: event as SupplierSummary}
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

  public checkIfAnyControlHasValue(): boolean {
    return Object.values(this.supplierFilterFormGroup.controls).some(control => control.value && control.value.trim() !== '');
  }
}

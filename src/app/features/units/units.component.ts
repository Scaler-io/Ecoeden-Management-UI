import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {debounceTime, delay, tap} from 'rxjs';
import {CommandResultStatus} from 'src/app/core/models/common';
import {DialogData} from 'src/app/core/models/dialog.model';
import {PaginationMetaData} from 'src/app/core/models/pagination';
import {TableColumnMap, TableDataSource} from 'src/app/core/models/table-source';
import {PaginatedUnitList, UnitCommadType, UnitSearchRequest, UnitSummary, UnitUpdateDialogData} from 'src/app/core/models/unit';
import {ConfirmDialogComponent} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import {SearchLayoutService} from 'src/app/shared/components/search-layout/search-layout.service';
import {getMobileViewState} from 'src/app/state/mobile-view/mobile-view.selector';
import {getUnitCount, getPaginatedUnits, getUnitCommandResponse} from 'src/app/state/unit/unit.selector';
import {AppState} from 'src/app/store/app.state';
import * as requestPageActions from '../../state/request-page/request-page.action';
import * as unitActions from '../../state/unit/unit.action';
import {fadeSlideInOut} from 'src/app/core/animations/fadeInOut';
import {UnitUpdateDialogComponent} from './unit-update-dialog/unit-update-dialog.component';

@Component({
  selector: 'ecoeden-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss'],
  animations: [fadeSlideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitsComponent implements OnInit, OnDestroy {
  public dataLength: number;
  public isPageLoading: boolean = true;
  public paginationMetaData: PaginationMetaData;
  public units = new MatTableDataSource<UnitSummary>([]);
  public displayColumns = ['name', 'status'];
  public totalUnitCount: number;
  public searchTerm: string;
  public isSearchApplied: boolean;
  public isFilterApplied: boolean;
  public filterPanelOpened: boolean;
  public isMobileView: boolean;
  public deletedUnit: string;
  public unitFilterFormGroup: FormGroup = new FormGroup({
    status: new FormControl('')
  });
  public columnNameMap: TableColumnMap = {
    // id: {value: 'id', isDateField: false, isStatusField: false},
    name: {value: 'name', isDateField: false, isStatusField: false},
    status: {value: 'status', isDateField: false, isStatusField: true}
  };
  private currentSortField: string;
  private subscriptions = {
    paginatedUnits: null,
    unitTotalCount: null,
    performSearch: null,
    changeSortMenu: null,
    applyFilter: null,
    clearFilter: null,
    mobileViewState: null,
    unitDeleteCommand: null
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
      this.fetchUnitCount(); // fetch total unit list count
      this.fetchUnits(false, 1, 20); // first time call, with default serach params,
    });

    this.subscriptions.unitTotalCount = this.store.pipe(select(getUnitCount), delay(1000)).subscribe(response => {
      this.dataLength = response;
      this.totalUnitCount = response;
    });

    this.subscriptions.paginatedUnits = this.store.pipe(select(getPaginatedUnits), delay(1000)).subscribe(response => {
      this.useChangeDetection(() => {
        this.processUnitResponse(response);
        if (response.data.length === 0) this.isPageLoading = false;
      });
    });

    this.subscriptions.mobileViewState = this.store.pipe(select(getMobileViewState)).subscribe(response => {
      this.useChangeDetection(() => (this.isMobileView = response));
    });

    this.subscriptions.unitDeleteCommand = this.store.pipe(select(getUnitCommandResponse)).subscribe(response => {
      if (response && response.commandType === UnitCommadType.Delete) {
        if (response.status === CommandResultStatus.Success) {
          this.store.dispatch(
            new requestPageActions.RequestPageSet({
              heading: `Unit ${this.deletedUnit} deleted successfully`,
              subheading: 'You can create more or get back to the unit list page',
              nextUrl: 'units/add',
              previousUrl: 'units',
              requestPage: 'units'
            })
          );
          this.router.navigate(['success']);
        } else {
          this.toastr.error('Something went wrong. Please try again later');
        }
        this.store.dispatch(new unitActions.ClearUnitCommandResult());
      }
    });

    this.addUnit();
    this.performSearch();
    this.changeSortMenu();
    this.applyFilter();
    this.clearFilter();
  }

  ngOnDestroy(): void {
    if (this.subscriptions.paginatedUnits) this.subscriptions.paginatedUnits.unsubscribe();
    if (this.subscriptions.unitTotalCount) this.subscriptions.unitTotalCount.unsubscribe();
    if (this.subscriptions.performSearch) this.subscriptions.performSearch.unsubscribe();
    if (this.subscriptions.changeSortMenu) this.subscriptions.changeSortMenu.unsubscribe();
    if (this.subscriptions.applyFilter) this.subscriptions.applyFilter.unsubscribe();
    if (this.subscriptions.clearFilter) this.subscriptions.clearFilter.unsubscribe();
    if (this.subscriptions.mobileViewState) this.subscriptions.mobileViewState.unsubscribe();
    if (this.subscriptions.unitDeleteCommand) this.subscriptions.unitDeleteCommand.unsubscribe();
  }

  public checkIfAnyControlHasValue(): boolean {
    return Object.values(this.unitFilterFormGroup.controls).some(control => control.value && control.value.trim() !== '');
  }

  public onMobilePageChange(pageIndex: number) {
    this.noChangeDetection(() => {
      if (!this.isFilterApplied) {
        this.fetchUnits(!!this.searchTerm, pageIndex, 10, this.searchTerm, 'name,email,address', this.currentSortField);
      } else {
        this.fetchUnitsWithFilters(
          this.unitFilterFormGroup.value,
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
        this.fetchUnitsWithFilters(
          this.unitFilterFormGroup.value,
          event.pageIndex + 1,
          event.pageSize,
          this.searchTerm,
          'name,address,email',
          this.currentSortField
        );
      } else {
        this.fetchUnits(
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
    this.router.navigate(['units', (event as UnitSummary).id], {
      state: {unitData: event as UnitSummary}
    });
  }

  public onUpdate(event: TableDataSource): void {
    this.showUpdateDialog(event as UnitSummary);
  }

  public onDelete(event: TableDataSource): void {
    const unit = event as UnitSummary;
    this.deletedUnit = unit.name;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: <DialogData>{
        title: 'Are you sure you want to delete this unit?',
        content: 'Deleting this unit will permanently remove all associated records. This action cannot be undone.',
        primaryActionLabel: 'Delete',
        secondaryActionLabel: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response?.confirm) {
        this.store.dispatch(new unitActions.DeleteUnit(unit.id));
      }
    });
  }

  private showUpdateDialog(unit: UnitSummary): void {
    this.dialog.open(UnitUpdateDialogComponent, {
      data: <UnitUpdateDialogData>{
        title: `Update unit <br/>${unit.name}`,
        unit: unit,
        primaryActionLabel: 'Update'
      }
    });
  }

  private fetchUnits(
    isFilteredQuery: boolean,
    pageIndex: number,
    pageSize: number,
    matchPhrase: string = null,
    matchPhraseField: string = null,
    sortField: string = 'createdOn',
    sortOrder: string = 'Desc'
  ): void {
    this.isPageLoading = true;
    const unitSearchRequest: UnitSearchRequest = {
      isFilteredQuery: isFilteredQuery,
      pageIndex: pageIndex,
      pageSize: pageSize,
      matchPhrase: matchPhrase,
      matchPhraseField: matchPhraseField,
      sortField: sortField,
      sortOrder: sortOrder
    };
    this.store.dispatch(new unitActions.GetAllUnits(unitSearchRequest));
  }

  private fetchUnitsWithFilters(
    filters: {[key: string]: string},
    pageIndex: number,
    pageSize: number,
    matchPhrase: string = '',
    matchPhraseField: string = '',
    sortField: string = 'createdOn',
    sortOrder: string = 'Desc'
  ): void {
    this.isPageLoading = true;
    const unitSearchRequest: UnitSearchRequest = {
      isFilteredQuery: true,
      pageIndex: pageIndex,
      pageSize: pageSize,
      matchPhrase: matchPhrase,
      matchPhraseField: matchPhraseField,
      sortField: sortField,
      sortOrder: sortOrder,
      filters: filters
    };
    this.store.dispatch(new unitActions.GetAllUnits(unitSearchRequest));
  }

  private fetchUnitCount(filters: {[key: string]: string} = null, matchPhrase: string = '', matchPhraseField: string = ''): void {
    if (filters === null && matchPhrase === '' && matchPhraseField === '') {
      this.store.dispatch(new unitActions.GetUnitCount());
    } else {
      this.store.dispatch(
        new unitActions.GetUnitCount({
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

  private processUnitResponse(response: PaginatedUnitList): void {
    this.units.data = response.data;
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
                this.fetchUnitCount();
                this.fetchUnits(false, 1, 20, this.searchTerm, 'name,address,email', this.currentSortField);
              } else {
                this.fetchUnitCount(this.unitFilterFormGroup.value);
                this.fetchUnitsWithFilters(
                  this.unitFilterFormGroup.value,
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
                this.fetchUnitCount(null, searchText, 'name,address,email');
                this.fetchUnits(true, 1, 20, searchText, 'name,address,email', this.currentSortField);
              } else {
                this.fetchUnitCount(this.unitFilterFormGroup.value, searchText, 'name,address,email');
                this.fetchUnitsWithFilters(
                  this.unitFilterFormGroup.value,
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
          this.fetchUnits(!!this.searchTerm, 1, 20, this.searchTerm, 'name,address,email', sortField);
        } else {
          this.fetchUnitsWithFilters(this.unitFilterFormGroup.value, 1, 20, this.searchTerm, 'name,address,email', sortField);
        }
      });
    });
  }

  private applyFilter(): void {
    this.subscriptions.applyFilter = this.searchLayoutService.filter$.subscribe(() => {
      this.isFilterApplied = true;
      this.noChangeDetection(() => {
        this.fetchUnitCount(this.unitFilterFormGroup.value, this.searchTerm, 'name,address,email');
        this.fetchUnitsWithFilters(
          this.unitFilterFormGroup.value,
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
      this.unitFilterFormGroup.reset();
      this.noChangeDetection(() => {
        this.fetchUnitCount(null, this.searchTerm, 'name,address,email');
        this.fetchUnits(!!this.searchTerm, 1, 20, this.searchTerm, 'name,address,email', this.currentSortField);
      });
    });
  }

  private addUnit(): void {
    this.searchLayoutService.addNewAction$.subscribe(() => {
      this.router.navigate(['units', 'add']);
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

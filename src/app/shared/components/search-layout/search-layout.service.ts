import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchLayoutService {
  // Observable sources
  private searchInputSource = new BehaviorSubject<FormControl>(new FormControl(''));
  private filterSource = new Subject<void>();
  private sortChangeSource = new Subject<string>();
  private filterClearSource = new Subject<void>();
  private addNewActionSource = new Subject<void>();
  private panelClosedSource = new Subject<boolean>();

  // Observable streams
  searchInput$ = this.searchInputSource.asObservable();
  filter$ = this.filterSource.asObservable();
  sortChange$ = this.sortChangeSource.asObservable();
  filterClear$ = this.filterClearSource.asObservable();
  addNewAction$ = this.addNewActionSource.asObservable();
  panelClosed$ = this.panelClosedSource.asObservable();

  constructor() {}

  emitSearchInput(formControl: FormControl) {
    this.searchInputSource.next(formControl);
  }

  emitFilter() {
    this.filterSource.next();
  }

  emitSortChange(sortField: string) {
    this.sortChangeSource.next(sortField);
  }

  emitFilterClear() {
    this.filterClearSource.next();
  }

  emitAddNewAction() {
    this.addNewActionSource.next();
  }

  emitPanelClosed(isOpened: boolean) {
    this.panelClosedSource.next(isOpened);
  }
}

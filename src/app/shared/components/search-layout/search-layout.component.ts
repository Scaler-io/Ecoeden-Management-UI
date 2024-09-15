import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ecoeden-search-layout',
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchLayoutComponent implements OnInit {
  public searchInput: FormControl = new FormControl('');
  public filterPanelOpened: boolean = false;
  public selectedSortField: string = 'Last created';
  public isFilterApplied: boolean = false;

  @Input() filterLabel: string = 'FILTER';
  @Input() addButtonLabel: string = 'ADD';
  @Input() isFileterFormValid: boolean;

  @Output() searchInputChanged = new EventEmitter<FormControl>();
  @Output() filter = new EventEmitter<void>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() filterClear = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    this.searchInputChanged.emit(this.searchInput);
  }

  public toggleFilterPanel(): void {
    this.filterPanelOpened = !this.filterPanelOpened;
  }

  public sortMenuChanged(sortField: string): void {
    if (sortField === 'createdOn') this.selectedSortField = 'Last created';
    else this.selectedSortField = 'Last updated';
    this.sortChange.emit(sortField);
  }

  public applyFilter(): void {
    this.isFilterApplied = true;
    this.filterPanelOpened = false;
    this.filter.emit();
  }

  public clearFilter(): void {
    this.isFilterApplied = false;
    this.filterClear.emit();
  }
}

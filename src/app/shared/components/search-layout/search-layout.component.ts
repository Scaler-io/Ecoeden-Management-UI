import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SearchLayoutService} from './search-layout.service';

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

  constructor(private searchLayoutService: SearchLayoutService) {}

  ngOnInit(): void {
    this.searchLayoutService.emitSearchInput(this.searchInput);
  }

  public toggleFilterPanel(): void {
    this.filterPanelOpened = !this.filterPanelOpened;
    this.searchLayoutService.emitPanelClosed(this.filterPanelOpened);
  }

  public sortMenuChanged(sortField: string): void {
    if (sortField === 'createdOn') this.selectedSortField = 'Last created';
    else this.selectedSortField = 'Last updated';
    this.searchLayoutService.emitSortChange(sortField);
  }

  public applyFilter(): void {
    this.isFilterApplied = true;
    this.filterPanelOpened = false;
    this.searchLayoutService.emitFilter();
  }

  public clearFilter(): void {
    if (this.isFilterApplied) {
      this.isFilterApplied = false;
      this.searchLayoutService.emitFilterClear();
    }
  }

  public onAddResource(): void {
    this.searchLayoutService.emitAddNewAction();
  }
}

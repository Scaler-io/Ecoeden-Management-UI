import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UnitSummary} from 'src/app/core/models/unit';

@Component({
  selector: 'ecoeden-unit-list-mobile',
  templateUrl: './unit-list-mobile.component.html',
  styleUrls: ['./unit-list-mobile.component.scss']
})
export class UnitListMobileComponent implements OnInit {
  @Input() unitList: UnitSummary[];
  @Input() public totalCount: number;
  @Input() public currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  public onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.pageChange.next(pageIndex);
  }

  public onVisit(unitId: string): void {
    console.log(unitId);
  }
}

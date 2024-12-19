import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerSummary} from 'src/app/core/models/customer.model';

@Component({
  selector: 'ecoeden-customer-list-mobile',
  templateUrl: './customer-list-mobile.component.html',
  styleUrls: ['./customer-list-mobile.component.scss']
})
export class CustomerListMobileComponent implements OnInit {
  @Input() customerList: CustomerSummary[];
  @Input() public totalCount: number;
  @Input() public currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  public onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.pageChange.next(pageIndex);
  }

  public onVisit(customerId: string): void {
    console.log(customerId);
  }
}

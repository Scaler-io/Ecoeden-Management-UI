import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SupplierSummary} from 'src/app/core/models/supplier';

@Component({
  selector: 'ecoeden-supplier-list-mobile',
  templateUrl: './supplier-list-mobile.component.html',
  styleUrls: ['./supplier-list-mobile.component.scss']
})
export class SupplierListMobileComponent implements OnInit {
  @Input() supplierList: SupplierSummary[];
  @Input() public totalCount: number;
  @Input() public currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  public onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.pageChange.next(pageIndex);
  }

  public onVisit(supplierId: string): void {
    console.log(supplierId);
  }
}

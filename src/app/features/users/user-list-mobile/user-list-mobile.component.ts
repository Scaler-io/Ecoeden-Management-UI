import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserSummary} from 'src/app/core/models/user';

import {Router} from '@angular/router';

@Component({
  selector: 'ecoeden-user-list-mobile',
  templateUrl: './user-list-mobile.component.html',
  styleUrls: ['./user-list-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListMobileComponent implements OnInit {
  @Input() public userList: UserSummary[] = [];
  @Input() public totalCount: number;
  @Input() public currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.pageChange.next(pageIndex);
  }

  public onVisit(id: string) {
    this.router.navigateByUrl(`users/${id}`);
  }
}

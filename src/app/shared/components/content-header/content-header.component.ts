import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {BreadcrumbService} from 'xng-breadcrumb';

@Component({
  selector: 'ecoeden-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit {
  public pageIcon: string;
  public pageName: string;
  public isBusy: boolean = true;
  public isSuccessPage: boolean;

  private pageIconMap = {
    ['Dashboard']: 'dashboard',
    ['Users']: 'person',
    ['Products']: 'psychiatry',
    ['Suppliers']: 'local_shipping',
    ['Customers']: 'diversity_1'
  };

  constructor(
    private breadcrumb: BreadcrumbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        this.isSuccessPage = this.router.url === '/success';
      }
    });

    this.breadcrumb.breadcrumbs$.subscribe(page => {
      if (page) {
        const pageLabel = page[page.length - 1]?.label as string;
        this.pageIcon = this.pageIconMap[page[0]?.label.toString()];
        this.pageName = pageLabel;
        this.isBusy = false;
      }
    });
  }
}

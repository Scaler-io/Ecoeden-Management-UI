import {Component, OnInit} from '@angular/core';
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
  private pageIconMap = {
    ['Dashboard']: 'dashboard',
    ['Users']: 'person',
    ['Products']: 'psychiatry'
  };

  constructor(private breadcrumb: BreadcrumbService) {}

  ngOnInit(): void {
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

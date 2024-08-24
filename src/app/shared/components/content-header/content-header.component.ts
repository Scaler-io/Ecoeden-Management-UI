import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'ecoeden-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss'],
})
export class ContentHeaderComponent implements OnInit {
  public pageIcon: string;
  public pageName: string;

  private pageIconMap = {
    ['Dashboard']: 'dashboard',
    ['Users']: 'person',
    ['Products']: 'psychiatry',
  };

  constructor(private breadcrumb: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumb.breadcrumbs$.subscribe((page) => {
      const pageLabel = page[0]?.label as string;
      this.pageIcon = this.pageIconMap[pageLabel];
      this.pageName = pageLabel;
    });
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {BannerType} from './banner.model';

@Component({
  selector: 'ecoeden-notice-banner',
  templateUrl: './notice-banner.component.html',
  styleUrls: ['./notice-banner.component.scss']
})
export class NoticeBannerComponent implements OnInit {
  @Input() type: BannerType = BannerType.basic;
  @Input() isImportant: boolean;
  @Input() customHeading: string;

  constructor() {}

  ngOnInit(): void {}
}

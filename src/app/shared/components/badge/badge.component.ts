import {Component, Input, NgZone, OnInit} from '@angular/core';

@Component({
  selector: 'ecoeden-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  @Input() label: string;

  constructor() {}

  ngOnInit(): void {}
}

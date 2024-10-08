import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ecoeden-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit {
  @Input() label: string;
  @Input() color: string = '#fff';

  constructor() {}

  ngOnInit(): void {}
}

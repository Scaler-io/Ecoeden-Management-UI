import {Component, Input, OnInit} from '@angular/core';
import {CardStyle} from './individual-details.model';

@Component({
  selector: 'ecoeden-individual-details',
  templateUrl: './individual-details.component.html',
  styleUrls: ['./individual-details.component.scss']
})
export class IndividualDetailsComponent implements OnInit {
  @Input() label: string;
  @Input() value: string;
  @Input() icon: string;

  @Input() style: string = CardStyle.basic;
  @Input() isLarge: boolean;
  @Input() color: string;

  constructor() {}

  ngOnInit(): void {}
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ecoeden-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() isAutoWidth: boolean;
  @Input() isLoading: boolean;
  @Input() isDisabled: boolean;

  @Output() next: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  public onButtonClick(event: Event): void {
    event.preventDefault();
    this.next.emit();
  }
}

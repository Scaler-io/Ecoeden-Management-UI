import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[numberOnly]'
})
export class NumberOnlyDirective {
  constructor() {}

  @HostListener('keydown', ['$event'])
  onKeyDow(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (
      allowedKeys.includes(event.key) ||
      (event.ctrlKey && (event.key === 'a' || event.key === 'c' || event.key === 'v' || event.key === 'x'))
    ) {
      return;
    }

    if (/^[0-9]$/.test(event.key)) {
      return;
    }

    event.preventDefault();
  }
}

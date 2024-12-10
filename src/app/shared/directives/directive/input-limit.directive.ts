import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[inputLimit]'
})
export class InputLimitDirective {
  private length: number = 0;

  @Input()
  set inputLimit(value: string) {
    this.length = +value;
  }

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (
      allowedKeys.includes(event.key) ||
      (event.ctrlKey && (event.key === 'a' || event.key === 'c' || event.key === 'v' || event.key === 'x'))
    ) {
      return;
    }
    if (this.el.nativeElement.value.length < this.length) {
      return;
    }
    event.preventDefault();
  }
}

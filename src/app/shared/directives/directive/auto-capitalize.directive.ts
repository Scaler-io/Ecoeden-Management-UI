import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[autoCapitalize]'
})
export class AutoCapitalizeDirective {
  private defaultAutoCapitalize = true;

  @Input()
  set autoCapitalize(value: boolean | string) {
    this.defaultAutoCapitalize = value !== false && value !== 'false';
  }

  constructor(private el: ElementRef) {}

  @HostListener('blur') onBlur() {
    if (this.defaultAutoCapitalize) {
      const inputValue: string = this.el.nativeElement.value;
      if (inputValue.length > 0) {
        this.el.nativeElement.value = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      }
    }
  }
}

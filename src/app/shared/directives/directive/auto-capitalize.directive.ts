import {Directive, ElementRef, HostListener, Input, Optional} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[autoCapitalize]'
})
export class AutoCapitalizeDirective {
  private defaultAutoCapitalize = true;

  @Input()
  set autoCapitalize(value: boolean | string) {
    this.defaultAutoCapitalize = value !== false && value !== 'false';
  }

  constructor(
    private el: ElementRef,
    @Optional() private control: NgControl
  ) {}

  @HostListener('blur') onBlur() {
    if (this.defaultAutoCapitalize) {
      const inputValue: string = this.el.nativeElement.value;
      if (inputValue.length > 0) {
        const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        this.el.nativeElement.value = capitalizedValue;
        if (this.control) {
          this.control.control?.setValue(capitalizedValue);
        }
      }
    }
  }
}

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (!value) return;

    value.trim();
    const splittedStrings = value.split(/(?=[A-Z])/);
    let transformedString = '';
    splittedStrings.map(s => (transformedString += ' ' + s));
    transformedString = transformedString.trim().toLowerCase();
    return transformedString.charAt(0).toUpperCase() + transformedString.substring(1, transformedString.length);
  }
}

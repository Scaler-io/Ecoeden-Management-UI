import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatStatus'
})
export class FormatStatusPipe implements PipeTransform {
  transform(value: string | boolean, ...args: unknown[]): string {
    if (value.toString().includes('0001')) return 'Not available';
    else if (typeof value == 'boolean') return value ? 'Enabled' : 'Disabled';
    else return value.toString();
  }
}

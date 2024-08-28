import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    if (!value) return;
    return moment(value, 'YYYY-MM-DDTHH:mm:ss').format('DD MMM YY');
  }
}

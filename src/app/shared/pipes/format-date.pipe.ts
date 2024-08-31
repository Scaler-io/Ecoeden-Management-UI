import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    if (!value) return;

    const formats = [
      'DD/MM/YYYY HH:mm:ss A', // Format with AM/PM
      'MM/DD/YYYY HH:mm:ss A', // Another possible format
      'DD/MM/YYYY HH:mm:ss', // 24-hour format without AM/PM
      'MM/DD/YYYY HH:mm:ss', // Another possible 24-hour format
      'YYYY-MM-DD HH:mm:ss', // ISO-like format
      'YYYY/MM/DD HH:mm:ss', // Another variant,
      'YYYY-MM-DDTHH:mm:ss'
    ];

    const parsedDate = moment(value, formats);
    if (parsedDate.isValid()) {
      return parsedDate.format('DD MMM YYYY, hh:mm:ss A');
    }

    return value as string;
  }
}

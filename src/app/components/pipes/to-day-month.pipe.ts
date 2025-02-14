import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toDayMonth'
})
export class ToDayMonthPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.toLocaleString('en', { month: 'long' });
    return `${month} ${day}`;
  }
}

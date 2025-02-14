import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toHours'
})
export class ToHoursPipe implements PipeTransform {

  transform(value: string): string {
    return value.slice(11, 16);
  }

}

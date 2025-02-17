import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'kelvinToCelcius'
})
export class KelvinToCelciusPipe implements PipeTransform {

  transform(value: number): unknown {
    return (value - 273).toFixed(1);
  }
}

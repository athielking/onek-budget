import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absolute'
})
export class AbsolutePipe implements PipeTransform {

  transform(value: number, args?: any): number {

    if (isNaN(value)) {
      return undefined;
    }

    return Math.abs(value);
  }

}

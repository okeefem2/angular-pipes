import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any): any {
    if (value.length > 0) {
      let valueArray = value.trim().split('');
      value = valueArray.reverse().join('');
    }
    return value;
  }

}

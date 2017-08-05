import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, asc: boolean): any {
    if (value.length > 0) {
      let mult = asc ? 1 : -1;
      value.sort((a, b) => {
        if (a.name < b.name) {
          return -1 * mult;
        } else if (b.name < a.name) {
          return 1 * mult;
        } else {
          return 0;
        }
      });
    }
    return value;
  }

}

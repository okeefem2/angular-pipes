import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, propName: string, filterString: string): any {
    if (value.length > 0 && filterString !== '') {
      const resultArray = [];
      for (const item of value) {
        if (item[propName] === filterString) {
          resultArray.push(item);
        }
      }
      return resultArray;
    }
    return value;
  }

}

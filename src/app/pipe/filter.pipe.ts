import { Pipe, PipeTransform } from '@angular/core';
// pure: false forces update on data change
@Pipe({
  name: 'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, propName: string, filterString: string): any {
    if (value.length > 0 && filterString !== '') {
      const resultArray = [];
      for (const item of value) {
        if (item[propName].indexOf(filterString) > -1) {
          resultArray.push(item);
        }
      }
      return resultArray;
    }
    return value;
  }

}

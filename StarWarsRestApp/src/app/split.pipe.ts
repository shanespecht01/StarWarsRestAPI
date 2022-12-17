//import { SplitPipe } from './split.pipe';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {
  transform(input: string, last: boolean): string {
    var lastSpaceIndex = input.lastIndexOf(' ');
    var firstName = input.substring(0, lastSpaceIndex);
    var lastName = input.substring(lastSpaceIndex+1);
    
    if (last)
    {
      if (firstName === "")
        return ""
      else
        return lastName
    }
    else {
      if (firstName === "")
        return lastName
      else
        return firstName
    }
  }
}


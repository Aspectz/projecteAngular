import { Pipe, PipeTransform } from '@angular/core';

import { IPost } from '../interfaces/i-post';

@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {

  transform(posts: IPost[] | undefined, filterBy:string ): IPost[] {
    if(!filterBy || filterBy=="" && !posts)
      return posts!;
    filterBy=filterBy.toLowerCase();
    return posts!.filter(p=>p.title.toLowerCase().includes(filterBy));
  }

}

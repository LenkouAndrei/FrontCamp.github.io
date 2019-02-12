import {Component, Input} from '@angular/core';
import {dateToArray} from '../../utils/utils';

@Component({
  selector: 'fc-article',
  templateUrl: './fc-article.html',
  styleUrls: ['./fc-article.less'],
})
export class FcArticleComponent {
  @Input()
  public article;

  public getDate(fullDateAsString: string): string {
    const [date, time] = dateToArray(fullDateAsString);
    return date;
  }

  public getTime(fullDateAsString: string): string {
    const [date, time] = dateToArray(fullDateAsString);
    return time;
  }

  public deleteItem(): void {
    console.log('Deleted!!!');
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {dateToArray} from '../../utils/utils';

@Component({
  selector: 'fc-article',
  templateUrl: './fc-article.html',
  styleUrls: ['./fc-article.less'],
})
export class FcArticleComponent implements OnInit {
  @Input()
  public article;

  public ngOnInit(): void {
    console.log('ARTICLE ', this.article);
  }

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

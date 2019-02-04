import {Component, Input} from '@angular/core';

@Component({
  selector: 'fc-article',
  templateUrl: './fc-article.html',
  styleUrls: ['./fc-article.less'],
})
export class FcArticleComponent {
  @Input()
  public article;

  public getDate(fullDateAsString: string): string {
    const [date, time] = this.dateToArray(fullDateAsString);
    return date;
  }

  public getTime(fullDateAsString: string): string {
    const [date, time] = this.dateToArray(fullDateAsString);
    return time;
  }

  private dateToArray(fullDateAsString: string): string[] {
    const truncatedDate = fullDateAsString.slice(0, -1);
    return truncatedDate.split('T');
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ARTICLE_LIST} from '../fc-main-page/fc-articles-list/article-list.model';
import {dateToArray} from '../utils/utils';

@Component({
  selector: 'fc-article-page',
  templateUrl: './fc-article-page.html',
  styleUrls: ['./fc-article-page.less'],
})
export class FcArticlePageComponent implements OnInit {
  public article;
  constructor(private route: ActivatedRoute) {}
  public ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.article = ARTICLE_LIST[+params.get('id')];
      });
  }

  public getDate(fullDateAsString: string): string {
    const [date, time] = dateToArray(fullDateAsString);
    return date;
  }

  public getTime(fullDateAsString: string): string {
    const [date, time] = dateToArray(fullDateAsString);
    return time;
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ARTICLE_LIST} from '../fc-main-page/fc-articles-list/article-list.model';
import {dateToArray} from '../utils/utils';
import {HttpDatabaseService} from '../services/http.database.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'fc-article-page',
  templateUrl: './fc-article-page.html',
  styleUrls: ['./fc-article-page.less'],
})
export class FcArticlePageComponent implements OnInit {
  public article;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private httpDatabaseService: HttpDatabaseService,
  ) {}

  public ngOnInit(): void {
    this.activateRoute.paramMap
      .subscribe(params => {
        console.log(params);
        this.httpDatabaseService.getArticle(params.get('id'))
          .subscribe(article => {
            console.log(article);
            this.article = article;
          });
        // this.article = ARTICLE_LIST[+params.get('id')];
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

  public deleteAndLeave(): void {
    console.log('Deleted!!!');
    this.router.navigate(['/articles']);
  }
}

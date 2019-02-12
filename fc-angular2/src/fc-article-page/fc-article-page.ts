import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {dateToArray} from '../utils/utils';
import {HttpDatabaseService} from '../services/http.database.service';

@Component({
  selector: 'fc-article-page',
  templateUrl: './fc-article-page.html',
  styleUrls: ['./fc-article-page.less'],
})
export class FcArticlePageComponent implements OnInit {
  public article;
  public databaseSource = 'Database Source';
  private articleId;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private httpDatabaseService: HttpDatabaseService,
  ) {}

  public ngOnInit(): void {
    this.activateRoute.paramMap
      .subscribe(params => {
        this.articleId = params.get('id');
        this.httpDatabaseService.getArticle(this.articleId)
          .subscribe(article => this.article = article);
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
    this.httpDatabaseService.deleteArticle(this.articleId)
      .subscribe(() => this.router.navigate(['/articles']));
  }
}

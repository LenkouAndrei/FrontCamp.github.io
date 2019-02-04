import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'fc-main-page',
  templateUrl: './fc-main-page.html',
  styleUrls: ['./fc-main-page.less'],
})
export class FcMainPageComponent implements OnInit {
  private defaultNewsChanel = 'bbc-news';
  public articlesList;
  constructor(private httpService: HttpService) {}

  public loadNews(sourceId: string): void {
    this.httpService.getArticlesBySourceId(sourceId)
      .subscribe(newsList => {
        this.articlesList = newsList;
      });
  }

  public ngOnInit(): void {
    this.httpService.getArticlesBySourceId(this.defaultNewsChanel)
      .pipe(take(1))
      .subscribe(newsList => {
        this.articlesList = newsList;
      });
  }
}

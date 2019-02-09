import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService, INewsAPIArticle} from '../services/http.service';
import {take, takeUntil} from 'rxjs/operators';
import {Subject, combineLatest} from 'rxjs';
import {HttpDatabaseService} from '../services/http.database.service';

@Component({
  selector: 'fc-main-page',
  templateUrl: './fc-main-page.html',
  styleUrls: ['./fc-main-page.less'],
})
export class FcMainPageComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  private currentLoadedArticlesAmount = 0;
  private loadedArticlesAmountAtTime = 10;
  private defaultNewsChanel = 'bbc-news';
  private currentNewsChannel = 'bbc-news';
  public articlesList;
  public isOnlyMyArticles;
  public articlesCopy;
  public readonly loadMore = 'Load More';

  constructor(
    private httpService: HttpService,
    private httpDatabaseService: HttpDatabaseService,
  ) {}

  public loadNews(sourceId: string): void {
    this.currentNewsChannel = sourceId;
    this.currentLoadedArticlesAmount = this.loadedArticlesAmountAtTime;
    this.articlesList = this.articlesList.filter(article => article.isCreatedByMe);
    this.httpService.getArticlesBySourceId(this.currentNewsChannel, this.currentLoadedArticlesAmount)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(newsList => {
        this.articlesList = [ ...this.articlesList, ...newsList];
        this.articlesCopy = this.articlesList;
      });
  }

  public ngOnInit(): void {
    this.currentLoadedArticlesAmount = this.loadedArticlesAmountAtTime;
    combineLatest(
      this.httpService.getArticlesBySourceId(this.defaultNewsChanel, this.currentLoadedArticlesAmount ),
      this.httpDatabaseService.getAllArticles()
    ).pipe(take(1))
      .subscribe(([articlesAPI, articlesDatabase]) => {
      this.articlesList = [ ...articlesDatabase, ...articlesAPI];
      this.articlesCopy = this.articlesList;
    });
  }

  public toggleMyArticlesVisibility(isMyArticlesVisible: boolean): void {
    this.isOnlyMyArticles = isMyArticlesVisible;
  }

  public filterByWords(words: string): void {
    if (words === '') {
      this.articlesList = this.articlesCopy;
    } else {
      this.articlesList = this.articlesList.filter(article => {
        return this.isWordInArticleTitle(article, words) || this.isWordInArticleDescription(article, words);
      });
    }
  }

  public loadMoreArticles() {
    this.currentLoadedArticlesAmount += this.loadedArticlesAmountAtTime;
    this.httpService.getArticlesBySourceId(this.currentNewsChannel, this.currentLoadedArticlesAmount)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(newsList => {
        this.articlesList = [ ...this.articlesList, ...newsList];
        this.articlesCopy = this.articlesList;
      });
  }

  private isWordInArticleTitle(article: INewsAPIArticle, words: string): boolean {
    return article.title.toUpperCase().indexOf(words.toUpperCase()) !== -1;
  }

  private isWordInArticleDescription(article: INewsAPIArticle, words: string): boolean {
    return article.description.toUpperCase().indexOf(words.toUpperCase()) !== -1;
  }

  public ngOnDestroy() {
    console.log('ngOnDestory');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService, INewsAPIArticle} from '../services/http.service';
import {ARTICLE_LIST} from './fc-articles-list/article-list.model';
import {take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {HttpDatabaseService} from '../services/http.database.service';

interface INewsAPIArticleWithId extends INewsAPIArticle {
  id: number;
}

interface ICommonArticle extends INewsAPIArticleWithId {
  isCreatedByMe: boolean;
}

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
  private lastId: number;
  public articlesList;
  public isOnlyMyArticles;
  public articlesCopy;
  public readonly loadMore = 'Load More';

  constructor(
    private httpService: HttpService,
    private httpDatabaseService: HttpDatabaseService,
  ) {}

  public loadNews(sourceId: string): void {
    this.lastId = 0;
    this.currentNewsChannel = sourceId;
    this.currentLoadedArticlesAmount = this.loadedArticlesAmountAtTime;
    this.httpService.getArticlesBySourceId(this.currentNewsChannel, this.currentLoadedArticlesAmount)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(newsList => {
        this.setArticleList(newsList);
        this.articlesCopy = this.articlesList;
      });
  }

  public ngOnInit(): void {
    this.currentLoadedArticlesAmount = this.loadedArticlesAmountAtTime;
    this.httpService.getArticlesBySourceId(this.defaultNewsChanel, this.currentLoadedArticlesAmount )
      .pipe(take(1))
      .subscribe(newsList => {
        this.setArticleList(newsList);
        this.articlesCopy = this.articlesList;
      });
    this.httpDatabaseService.getAllArticles()
      .subscribe(res => console.log(res));
  }

  private setArticleList(articles: INewsAPIArticle[]): void {
    const articleList = this.expandArticlesWithId(ARTICLE_LIST);
    const articlesWithId = this.expandArticlesWithId(articles);
    const articleListAPI = this.expandArticlesWithCreatedByMe(articlesWithId);
    this.articlesList = [...articleList, ...articleListAPI];
  }

  private expandArticlesWithId(articles: INewsAPIArticle[]): INewsAPIArticleWithId[] {
    return articles.map((article, index) => {
      this.lastId += index;
      return {...article, id: this.lastId};
    });
  }

  private expandArticlesWithCreatedByMe(articles: INewsAPIArticleWithId[]): ICommonArticle[] {
    return articles.map(article => ({...article, isCreatedByMe: false}));
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
        this.setArticleList(newsList);
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

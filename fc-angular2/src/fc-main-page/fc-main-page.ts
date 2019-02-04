import {Component, OnInit} from '@angular/core';
import {HttpService, INewsAPIArticle} from '../services/http.service';
import {ARTICLE_LIST} from './fc-articles-list/article-list.model';

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
export class FcMainPageComponent implements OnInit {
  private defaultNewsChanel = 'bbc-news';
  public articlesList;
  public isOnlyMyArticles;

  constructor(private httpService: HttpService) {}

  public loadNews(sourceId: string): void {
    // this.httpService.getArticlesBySourceId(sourceId)
    //   .subscribe(newsList => {
    //     this.setArticleList(newsList);
    //   });
    console.log(sourceId);
    console.log(this.httpService);
    console.log(this.defaultNewsChanel);
  }

  public ngOnInit(): void {
    // this.httpService.getArticlesBySourceId(this.defaultNewsChanel)
    //   .pipe(take(1))
    //   .subscribe(newsList => {
        this.setArticleList(ARTICLE_LIST);
        // this.setArticleList(newsList);
      //   console.log(this.articlesList);
      // });
  }

  private setArticleList(articles: INewsAPIArticle[]): void {
    const articlesWithId = this.expandArticlesWithId(articles);
    const commonArticles = this.expandArticlesWithCreatedByMe(articlesWithId);
    // ARTICLE_LIST.length = 0;
    // commonArticles.forEach(article => ARTICLE_LIST.push(article));
    this.articlesList = commonArticles;
  }

  private expandArticlesWithId(articles: INewsAPIArticle[]): INewsAPIArticleWithId[] {
    return articles.map((article, index) => ({...article, id: index}));
  }

  private expandArticlesWithCreatedByMe(articles: INewsAPIArticleWithId[]): ICommonArticle[] {
    return articles.map((article, index) => {
      if (index === 2) {
        return {...article, isCreatedByMe: true};
      } else {
        return {...article, isCreatedByMe: false};
      }
    });
  }

  public toggleMyArticlesVisibility(isMyArticlesVisible: boolean): void {
    this.isOnlyMyArticles = isMyArticlesVisible;
  }
}

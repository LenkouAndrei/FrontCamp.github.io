import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, flatMap} from 'rxjs/operators';

interface INewsAPIArticlesResponse {
  articles: INewsAPIArticle[];
  sortBy: string;
  source: string;
  status: string;
}

interface INewsAPISourcesResponse {
  status: string;
  sources: INewsAPISource[];
}

export interface INewsAPIArticle {
  author: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage: string;
}

export interface INewsAPISource {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  sortBysAvailable: string[];
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly sourcesListRequest = `https://newsapi.org/v1/sources?&apiKey=b7898b8ae1f042849321a38b58c68df0`;

  constructor(
    private http: HttpClient,
  ) {}

  private getSourceUrl(sourceName: string): string {
    return`https://newsapi.org/v1/articles?source=${sourceName}&apiKey=b7898b8ae1f042849321a38b58c68df0`;
  }

  public getSourceList(): Observable<INewsAPISource[]> {
    return this.http.get<INewsAPISourcesResponse>(this.sourcesListRequest)
      .pipe(
        catchError(this.handleError('getSourceList', [])),
        flatMap(
          response => of((response as INewsAPISourcesResponse).sources),
        ),
      );
  }

  public getArticlesBySourceId(sourceId: string): Observable<INewsAPIArticle[]> {
    const sourceUrl = this.getSourceUrl(sourceId);
    return this.http.get<INewsAPIArticlesResponse>(sourceUrl)
      .pipe(
        catchError(this.handleError('getArticles', [])),
        flatMap(
          response => of((response as INewsAPIArticlesResponse).articles),
        ),
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

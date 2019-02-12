import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';

export interface IDatabaseArticle {
    author: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string;
    isCreatedByMe: boolean;
    id: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpDatabaseService {
  constructor(private http: HttpClient) {}

  public saveArticle(article): Observable<any> {
    return this.http.post('http://localhost:8080/', article);
  }

  public getArticle(id: string): Observable<any> {
    const options = { params: new HttpParams().set('id', id) };
    return this.http.get('http://localhost:8080/', options)
      .pipe(flatMap(
        responseAsArray => of((responseAsArray[0]))
      ));
  }

  public deleteArticle(id: string): Observable<any> {
    const options = { params: new HttpParams().set('id', id) };
    console.log(id);
    return this.http.post('http://localhost:8080/:id', {_method: 'delete'}, options);
  }

  public updateArticle(id: string): Observable<any> {
    const options = { params: new HttpParams().set('id', id) };
    return this.http.post('http://localhost:8080/:id', {_method: 'put'}, options);
  }

  public getAllArticles(): Observable<any> {
    return this.http.get('http://localhost:8080/');
  }
}

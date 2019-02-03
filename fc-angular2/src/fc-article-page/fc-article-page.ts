import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LIST} from '../fc-main-page/fc-articles-list/article-list.model';

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
        this.article = LIST[+params.get('id') - 1];
      });
  }
}

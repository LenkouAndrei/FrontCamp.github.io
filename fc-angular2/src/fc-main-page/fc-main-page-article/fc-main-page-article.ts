import {Component, Input} from '@angular/core';

@Component({
  selector: 'fc-main-page-article',
  templateUrl: './fc-main-page-article.html',
  styleUrls: ['./fc-main-page-article.less'],
})
export class FcMainPageArticleComponent {
  @Input()
  public article;
}

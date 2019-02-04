import {Component, Input} from '@angular/core';

@Component({
  selector: 'fc-article',
  templateUrl: './fc-article.html',
  styleUrls: ['./fc-article.less'],
})
export class FcArticleComponent {
  @Input()
  public article;
}

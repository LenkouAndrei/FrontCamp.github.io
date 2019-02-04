import {Component, Input} from '@angular/core';

@Component({
  selector: 'fc-articles-list',
  templateUrl: './fc-articles-list.html',
  styleUrls: ['./fc-articles-list.less'],
})
export class FcArticlesListComponent {
  @Input()
  public articles;
}

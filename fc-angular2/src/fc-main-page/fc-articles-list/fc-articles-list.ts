import {Component} from '@angular/core';
import {LIST} from './article-list.model';

@Component({
  selector: 'fc-articles-list',
  templateUrl: './fc-articles-list.html',
  styleUrls: ['./fc-articles-list.less'],
})
export class FcArticlesListComponent {
  public list = LIST;
}

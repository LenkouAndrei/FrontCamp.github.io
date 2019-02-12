import { Pipe, PipeTransform } from '@angular/core';
import {INewsAPIArticle} from '../../services/http.service';
import {IDatabaseArticle} from '../../services/http.database.service';

@Pipe({
  name: 'feFilter'
})
export class FcFilterPipe implements PipeTransform {
  public transform(value: (IDatabaseArticle | INewsAPIArticle)[], substringToFind: string | undefined): INewsAPIArticle[] {
    if (!substringToFind) {
      return value;
    } else {
      const newValue = value.filter(article => {
        return this.isWordInArticleTitle(article, substringToFind) || this.isWordInArticleDescription(article, substringToFind);
      });
      return newValue;
    }
  }

  private isWordInArticleTitle(article: INewsAPIArticle, words: string): boolean {
    return article.title.toUpperCase().indexOf(words.toUpperCase()) !== -1;
  }

  private isWordInArticleDescription(article: INewsAPIArticle, words: string): boolean {
    return article.description.toUpperCase().indexOf(words.toUpperCase()) !== -1;
  }
}

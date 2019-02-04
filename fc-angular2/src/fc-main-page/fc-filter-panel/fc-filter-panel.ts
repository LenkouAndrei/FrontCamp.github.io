import {Component, EventEmitter, Output} from '@angular/core';
import {HttpService, INewsAPISource} from '../../services/http.service';

@Component({
  selector: 'fc-filter-panel',
  templateUrl: './fc-filter-panel.html',
  styleUrls: ['./fc-filter-panel.less'],
})
export class FcFilterPanelComponent {

  @Output()
  public onMyArticlesVisibilityStateChange: EventEmitter<boolean> = new EventEmitter();
  @Output()
  public onNewsSourceChange: EventEmitter<string> = new EventEmitter();

  public source = null;
  // public sourceList$ = this.httpService.getSourceList();
  public isOnlyMyVisible = false;

  constructor(private httpService: HttpService) {}

  public sourceChanged(currentSource: INewsAPISource): void {
    this.onNewsSourceChange.emit(currentSource.id);
    console.log(this.httpService);
  }

  public toggleCreatedByMe(): void {
    this.isOnlyMyVisible = !this.isOnlyMyVisible;
    this.onMyArticlesVisibilityStateChange.emit(this.isOnlyMyVisible);
  }
}

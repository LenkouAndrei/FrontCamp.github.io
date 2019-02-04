import {Component, EventEmitter, Output} from '@angular/core';
import {HttpService, INewsAPISource} from '../../services/http.service';

@Component({
  selector: 'fc-filter-panel',
  templateUrl: './fc-filter-panel.html',
  styleUrls: ['./fc-filter-panel.less'],
})
export class FcFilterPanelComponent {
  @Output()
  public valueChange: EventEmitter<string> = new EventEmitter();
  public source = null;
  public sourceList$ = this.httpService.getSourceList();

  constructor(private httpService: HttpService) {}

  public sourceChanged(currentSource: INewsAPISource): void {
    this.valueChange.emit(currentSource.id);
  }
}

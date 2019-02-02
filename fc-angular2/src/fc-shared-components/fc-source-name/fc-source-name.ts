import {Component, Input} from '@angular/core';

@Component({
  selector: 'fc-source-name',
  templateUrl: './fc-source-name.html',
  styleUrls: ['./fc-source-name.less'],
})
export class FcSourceNameComponent {
  @Input()
  public sourceName: string;
}

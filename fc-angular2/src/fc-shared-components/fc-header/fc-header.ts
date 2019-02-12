import {Component} from '@angular/core';

@Component({
  selector: 'fc-header',
  templateUrl: './fc-header.html',
  styleUrls: ['./fc-header.less'],
})
export class FcHeaderComponent {
  public userLogin = 'User Login';
  public buttonName = 'Log out';
}

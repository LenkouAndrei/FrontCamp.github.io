import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'fc-edit-page',
  templateUrl: './fc-edit-page.html',
  styleUrls: ['./fc-edit-page.less'],
})
export class FcEditPageComponent {

  constructor(private router: Router){}

  public saveAndLeavePage(): void {
    console.log('Saved!!!');
    this.router.navigate(['/articles']);
  }
}

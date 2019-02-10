import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'fc-edit-page',
  templateUrl: './fc-edit-page.html',
  styleUrls: ['./fc-edit-page.less'],
})
export class FcEditPageComponent implements OnInit {
  public pageName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => this.pageName = params.pageName);
  }

  public saveAndLeavePage(): void {
    console.log('Saved!!!');
    this.router.navigate(['/articles']);
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {HttpDatabaseService} from '../services/http.database.service';
import {of} from 'rxjs';

@Component({
  selector: 'fc-edit-page',
  templateUrl: './fc-edit-page.html',
  styleUrls: ['./fc-edit-page.less'],
})
export class FcEditPageComponent implements OnInit {
  public pageName: string;

  public editCreateForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormGroup({
      short: new FormControl('', [Validators.maxLength(50)]),
      full: new FormControl('', [Validators.required]),
    }),
    imageSrc: new FormControl('', [this.customUrlToImageValidetor()]),
    publishedAt: new FormControl('', [this.customDateValidator()]),
    creater: new FormControl(''),
    url: new FormControl(''),
  });

  private emptyFrom = {
    title: '',
    imageSrc: '',
    publishedAt: '',
    description: {
      short: '',
      full: '',
    },
    creater: '',
    url: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpDatabaseService: HttpDatabaseService,
  ) {}

  public ngOnInit(): void {
    this.route.queryParams
      .pipe(switchMap((params: Params) => {
        this.pageName = params.pageName;
        if (params.id !== undefined) {
          return this.httpDatabaseService.getArticle(params.id);
        } else {
          return of(this.emptyFrom);
        }
      }))
      .subscribe(article => this.setDataToForm(article));
  }

  public saveAndLeavePage(): void {
    console.log('Saved!!!');
    this.onSubmit();
    this.router.navigate(['/articles']);
  }

  public onSubmit(): void {
    console.log('Submited!!! ', this.editCreateForm.value);
  }

  private customDateValidator(): ValidatorFn {
    const pattern: RegExp = /^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})/;
    return (control: AbstractControl): {[ key: string ]: any} => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : {custom: 'Incorrect date format. Assign as mm/dd/yyyy'};
      }
    };
  }

  private customUrlToImageValidetor(): ValidatorFn {
    const pattern: RegExp = /\.(?:jpg|gif|png)$/;
    return (control: AbstractControl): {[ key: string ]: any} => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : {custom: 'Incorrect image extension/ Next formats are available: .jpg .gif .png'};
      }
    };
  }

  private setDataToForm(data: any): void {
    this.editCreateForm.setValue({
      title: data.title,
      imageSrc: data.urlToImage,
      publishedAt: data.publishedAt,
      description: {
        short: '',
        full: data.description,
      },
      creater: data.author,
      url: data.url,
    });
  }
}

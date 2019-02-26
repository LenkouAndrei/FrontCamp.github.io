import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {FcHeaderComponent} from '../fc-shared-components/fc-header/fc-header';
import {FcFilterPanelComponent} from '../fc-main-page/fc-filter-panel/fc-filter-panel';
import {FcSourceNameComponent} from '../fc-shared-components/fc-source-name/fc-source-name';
import {FcFooterComponent} from '../fc-shared-components/fc-footer/fc-footer';
import {FcArticleComponent} from '../fc-main-page/fc-article/fc-article';
import {FcArticlePageComponent} from '../fc-article-page/fc-article-page';
import {FcEditPageComponent} from '../fc-edit-page/fc-edit-page';
import {FcArticlesListComponent} from '../fc-main-page/fc-articles-list/fc-articles-list';
import {FcMainPageComponent} from '../fc-main-page/fc-main-page';
import {FcFilterPipe} from '../fc-main-page/fc-filter-panel/fc-filter.pipe';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        FcHeaderComponent,
        FcFilterPanelComponent,
        FcSourceNameComponent,
        FcFooterComponent,
        FcArticleComponent,
        FcArticlePageComponent,
        FcEditPageComponent,
        FcArticlesListComponent,
        FcMainPageComponent,
        FcFilterPipe
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FcAngular2'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('FcAngular2');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to fc-angular2!');
  });
});

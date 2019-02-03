import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FcHeaderComponent } from '../fc-shared-components/fc-header/fc-header';
import { FcFilterPanelComponent } from '../fc-main-page/fc-filter-panel/fc-filter-panel';
import { FcSourceNameComponent } from '../fc-shared-components/fc-source-name/fc-source-name';
import {FcFooterComponent} from '../fc-shared-components/fc-footer/fc-footer';
import {FcMainPageArticleComponent} from '../fc-main-page/fc-main-page-article/fc-main-page-article';
import {FcArticlePageComponent} from '../fc-article-page/fc-article-page';
import {FcEditPageComponent} from '../fc-edit-page/fc-edit-page';
import {FcArticlesListComponent} from '../fc-main-page/fc-articles-list/fc-articles-list';

@NgModule({
  declarations: [
    AppComponent,
    FcHeaderComponent,
    FcFilterPanelComponent,
    FcSourceNameComponent,
    FcFooterComponent,
    FcMainPageArticleComponent,
    FcArticlePageComponent,
    FcEditPageComponent,
    FcArticlesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

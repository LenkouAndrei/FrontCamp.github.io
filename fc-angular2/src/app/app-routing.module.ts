import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FcArticlesListComponent} from '../fc-main-page/fc-articles-list/fc-articles-list';
import {FcEditPageComponent} from '../fc-edit-page/fc-edit-page';
import {FcArticlePageComponent} from '../fc-article-page/fc-article-page';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'articles'},
  {path: 'articles', component: FcArticlesListComponent},
  {path: 'article/:id' , component: FcArticlePageComponent},
  {path: 'edit', component: FcEditPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

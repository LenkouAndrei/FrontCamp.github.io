import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FcEditPageComponent} from '../fc-edit-page/fc-edit-page';
import {FcArticlePageComponent} from '../fc-article-page/fc-article-page';
import {FcMainPageComponent} from '../fc-main-page/fc-main-page';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'articles'},
  {path: 'articles', component: FcMainPageComponent},
  {path: 'article/:id' , component: FcArticlePageComponent},
  {path: 'edit', component: FcEditPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

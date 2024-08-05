import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { AreaitemComponent } from './areaitem/areaitem.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: '', component: PageComponent },
  { path: 'categorylist', component: CategorylistComponent },
  { path: 'area-item', component: AreaitemComponent },
  { path: 'category', component: CategoryComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}

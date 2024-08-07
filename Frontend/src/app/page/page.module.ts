import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { AreaitemComponent } from './areaitem/areaitem.component';
import { CategoryComponent } from './category/category.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  declarations: [
    PageComponent,
    CategorylistComponent,
    AreaitemComponent,
    CategoryComponent,
  ],
  imports: [CommonModule, PageRoutingModule, TableModule, ButtonModule,PaginatorModule],
})
export class PageModule {}

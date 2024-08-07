import { Component, OnInit } from '@angular/core';
import { CategorysequenceService } from 'src/app/core/services/categorysequence.service';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  areaData: any = [];
  size: number = 3;
  page: number = 1;
  totalRecords: number = 0;
  constructor(
    private areaservice: CategorysequenceService,
    private itemservice: ItemService
  ) {}
  loadCategories(page: number, size: number) {
    this.areaservice.getcategory(page, size).subscribe({
      next: (response: any) => {
        this.areaData = response.data;
        console.log(this.areaData)
        this.totalRecords = response.total;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  ngOnInit(): void {
    this.areaservice.getcategory(1, 3).subscribe({
      next: (response: any) => {
        this.areaData = response.data;
        console.log(this.areaData)
        this.size = Number(response.data.length);
        this.totalRecords = Number(response.total);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onPageChange(event: any) {
    this.page = event.page + 1; 
    this.size = event.rows;
    this.loadCategories(this.page, this.size);
  }
  
}

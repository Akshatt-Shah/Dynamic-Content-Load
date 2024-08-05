import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorysequenceService } from 'src/app/core/services/categorysequence.service';
import { ProductcategorysequenceService } from 'src/app/core/services/productcategorysequence.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.scss'],
})
export class CategorylistComponent implements OnInit {
  categoryData: any = [];
  cols!: any[];
  constructor(
    private category: CategorysequenceService,
    private productitem: ProductcategorysequenceService,
    private router: Router
  ) {}
  getcategory() {
    this.category.getcategory().subscribe({
      next: (response: any) => {
        this.categoryData = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  ngOnInit(): void {
    this.getcategory();

    this.cols = [
      { field: '_id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'type', header: 'Type' },
      { field: 'sequence', header: 'Sequence' },
    ];
  }

  onRowReorder(event: any): void {
    let reordersequence: any = {};
    let data: any = this.categoryData[event.dropIndex];
    data.sequence = event.dropIndex + 1;
    reordersequence['name'] = data.name;
    reordersequence['type'] = data.type;
    reordersequence['description'] = data.description;
    reordersequence['sequence'] = data.sequence;
    this.category.updatecategory(data._id, reordersequence).subscribe({
      next: (response: any) => {
        this.getcategory();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onButtonClick(id: string) {
    this.productitem.setid(id);
    this.router.navigate(['/page/area-item']);
  }
}

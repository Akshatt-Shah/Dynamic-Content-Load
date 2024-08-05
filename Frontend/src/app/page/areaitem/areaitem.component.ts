import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductcategorysequenceService } from 'src/app/core/services/productcategorysequence.service';

@Component({
  selector: 'app-areaitem',
  templateUrl: './areaitem.component.html',
  styleUrls: ['./areaitem.component.scss'],
})
export class AreaitemComponent implements OnInit {
  id: string = '';
  areaItemdata: any = [];
  cols!: any[];
  areaItemdatavalue: any;
  constructor(
    private areaitem: ProductcategorysequenceService,
    private router: Router
  ) {}
  getAreaItem() {
    if (this.id !== '') {
      this.areaItemdatavalue = this.areaitem.areaItem(this.id).subscribe({
        next: (response: any) => {
          this.areaItemdata = [];
          this.areaItemdata = response.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.router.navigate(['/page/categorylist']);
    }
  }
  ngOnInit(): void {
    this.id = this.areaitem.getid();
    if (this.id === '') {
      this.router.navigate(['/page/categorylist']);
    } else {
      this.getAreaItem();
    }

    this.cols = [
      { field: 'AreaId._id', header: 'AreaId' },
      { field: 'AreaId.name', header: 'Area Name' },
      { field: 'ItemId._id', header: 'ItemId' },
      { field: 'ItemId.name', header: 'Item Name' },
      { field: 'sequence', header: 'Sequence' },
    ];
  }

  onRowReorder(data: any) {
    let sequencedata: any = {};
    const itemdata = this.areaItemdata[data.dropIndex];
    // console.log(itemdata);
    sequencedata['Area'] = itemdata.AreaId._id;
    sequencedata['Item'] = itemdata.ItemId._id;
    sequencedata['sequence'] = data.dragIndex + 1;
    sequencedata['newsequence'] = data.dropIndex + 1;
    this.areaitem.updateareaItem(sequencedata).subscribe({
      next: (response: any) => {
        this.getAreaItem();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Helper method to get nested values
  getNestedValue(data: any, field: string): any {
    return field
      .split('.')
      .reduce((acc: any, part: string) => acc && acc[part], data);
  }

  deleteAreaItem(id: string) {
    console.log(id);
    // this.areaitem.deleteareaItem(id).subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //     this.getAreaItem();
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
  }
}

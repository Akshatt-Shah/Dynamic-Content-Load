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
  itemData: any = [];
  constructor(private areaservice: CategorysequenceService,private itemservice :ItemService) {}
  ngOnInit(): void {}
}

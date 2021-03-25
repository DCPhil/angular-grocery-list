import { Component, OnInit } from '@angular/core';

import { Item } from '../item';
import {ItemService } from '../item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];
  filteredItems: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();    
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => {this.items = items; this.filteredItems = items});
  }

  checkUncheck(item: Item): void {
    this.itemService.updateItem(item)
      .subscribe(() => this.getItems());
  }

  itemsFilter(filter: string) {
    switch(filter) {
      case 'all':
        console.log("All");
        this.filteredItems = this.items
        break;
      case 'unchecked':
        console.log("Unchecked");
        this.filteredItems = this.items.filter(itemObj => itemObj.checked == false)
        break;
      case 'checked':
        console.log("Checked");
        this.filteredItems = this.items.filter(itemObj => itemObj.checked == true)
        break;
    }
  }

}

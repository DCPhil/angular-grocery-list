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
  checked: boolean = true;
  unchecked: boolean = true;

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
        this.filteredItems = this.items
        this.checked = true;
        this.unchecked = true;
        break;
      case 'unchecked':
        this.filteredItems = this.items.filter(itemObj => itemObj.checked == false)
        if(this.filteredItems.length == 0) {
          this.unchecked = false;
          this.checked = true;
        } else {
          this.unchecked = true;
          this.checked = true;
        }
        break;
      case 'checked':
        this.filteredItems = this.items.filter(itemObj => itemObj.checked == true)
        if(this.filteredItems.length == 0) {
          this.checked = false;
          this.unchecked = true;
        } else {
          this.checked = true;
          this.unchecked = true;
        }
        break;
    }
  }

}

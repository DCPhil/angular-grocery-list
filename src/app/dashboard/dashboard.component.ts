import { Component, OnInit } from '@angular/core';

import { Item } from '../item';
import { ItemService } from '../item.service';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: Item[] = []
  loadingItems: boolean = false;
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.loadingItems = true;
    this.items = [];
    this.itemService.getItems()
    .subscribe(
      items => this.items = items,
      err => console.error(err),
      () => {this.filterChecked();this.loadingItems = false}
    )
  }

  filterChecked() {
    this.items = this.items.filter(itemObj => itemObj.checked == false);
    this.items = this.items.slice(0,4);
  }

  checkUncheck(item: Item): void {
    this.itemService.updateItem(item)
      .subscribe(() => this.getItems());
  }

}

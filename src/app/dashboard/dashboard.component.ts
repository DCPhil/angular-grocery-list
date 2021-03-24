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

  constructor(private itemsService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.items = [];
    this.itemsService.getItems()
    .subscribe(
      items => this.items = items,
      err => console.error(err),
      () => this.filterChecked()
    )
  }

  filterChecked() {
    this.items = this.items.filter(item => item.checked == false);
    this.items = this.items.slice(0,4);
  }

  checkUncheck(item: Item): void {
    this.itemsService.updateItem(item)
      .subscribe(() => this.getItems());
  }

}

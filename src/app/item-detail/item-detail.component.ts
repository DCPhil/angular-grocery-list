import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @Input() item?: Item;

  constructor(
    private route: ActivatedRoute,
    private loaction: Location,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(id)
      .subscribe(item => this.item = item);
  }

  saveItem(): void {
    this.itemService.updateItem(this.item)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.loaction.back();
  }

}

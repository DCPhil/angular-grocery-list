import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const items = [
      { id: 1, name: 'Milk', checked: false, qty: 2, note: '1/2 gallons' },
      { id: 2, name: 'Eggs', checked: false, qty: 1, note: '18 count package' },
      { id: 3, name: 'Bread', checked: false, qty: 1, note: 'Whole Wheat' },
      { id: 4, name: 'Sugar', checked: false, qty: 1, note: '1/2 lb' },
      { id: 5, name: 'Flour', checked: false, qty: 1, note: '1 lb' },
      { id: 6, name: 'Chips', checked: false, qty: 2, note: 'tottillas and potato' },
      { id: 7, name: 'Ice Cream', checked: false, qty: 2, note: 'chocolate and vanilla' },
      { id: 8, name: 'Carrots', checked: false, qty: 6, note: '' },
      { id: 9, name: 'Tomatoes', checked: false, qty: 3, note: '' },
      { id: 10, name: 'Bananas', checked: false, qty: 5, note: '' },
      { id: 11, name: 'Onions', checked: false, qty: 2, note: '1 yellow and 1 red' }
    ];

    return {items};
  }

  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  }
}

import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsUrl = 'api/items'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl)
  }

  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url);
  }

  updateItem(item: Item): Observable<any>{
    return this.http.put<Item>(this.itemsUrl, item, this.httpOptions)
  }



}

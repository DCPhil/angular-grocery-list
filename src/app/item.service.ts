import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsUrl = 'api/items'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl)
      .pipe(
        tap(_ => this.log('Items fetched')),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url)
      .pipe(
        tap(_ => this.log(`Fetched item id=${id}`)),
        catchError(this.handleError<Item>(`getItem if=${id}`))
      );
  }

  updateItem(item: Item): Observable<any>{
    return this.http.put<Item>(this.itemsUrl, item, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Updated item id=${item.id}`)),
        catchError(this.handleError<any>('updateItem'))
      );
  }

  addItem(item: Item): Observable<Item> {
    item.checked = false;
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions)
      .pipe(
        tap((newItem: Item) => this.log(`Added item w/ id=${newItem.id}`)),
        catchError(this.handleError<Item>('addItem'))
      );
  }

  deleteItem(item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.itemsUrl}/${id}`;
    return this.http.delete<Item>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Deleted item id=${id}`)),
        catchError(this.handleError<Item>('deletedItem'))
      );
  }

  private handleError<T>(operation = "operation", result?: T ) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }



}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public _itemAdded: Subject<string> = new Subject();
  public _itemChanged: Subject<string> = new Subject();
  public _itemRemoved: Subject<string> = new Subject();

  public itemAdded: Observable<string> = this._itemAdded.asObservable();
  public itemChanged: Observable<string> = this._itemChanged.asObservable();
  public itemRemoved: Observable<string> = this._itemRemoved.asObservable();

  constructor() { }

  public setItem(key: string, value: any) {

    const itemExists = localStorage.getItem(key) != null;

    if (typeof(value) !== 'string') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }

    if (!itemExists) {
      this._itemAdded.next(key);
    }

    this._itemChanged.next(key);
  }

  public getItem(key: string, parse: boolean = false) {
    let value = localStorage.getItem(key);
    if (value === null || value === undefined) {
      return value;
    }

    if (parse) {
      value = JSON.parse(value);
    }

    return value;
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
    this._itemRemoved.next(key);
  }
}

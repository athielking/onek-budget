import { Injectable } from '@angular/core';
import { merge, map } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../transaction/transaction.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { CategoriesService } from './categories.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesStore {

  private _majorCategories: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _majorCategory: BehaviorSubject<string> = new BehaviorSubject('');

  private _minorCategories: BehaviorSubject<Map<string, string[]>> = new BehaviorSubject(new Map<string, string[]>());
  private _minorCategory: BehaviorSubject<string[]> = new BehaviorSubject([]);

  public majorCategories$: Observable<string[]> = this._majorCategories.asObservable();
  public minorCategories$: Observable<Map<string, string[]>> = this._minorCategories.asObservable();

  public majorCategory$: Observable<string> = this._majorCategory.asObservable();
  public minorCategory$: Observable<string[]>;

  constructor(private categoriesService: CategoriesService) {

    this.minorCategory$ = combineLatest(this.majorCategory$, this.minorCategories$).pipe(map( value => {
      const key = <string>value[0];
      const values = <Map<string, string[]>>value[1];

      if (values && values.has(key)) {
        return values.get(key);
      }
      return [];
    }));
  }

  public loadCategories() {
    this.getMajorCategories();
    this.getMinorCategories();
  }

  public getMajorCategories() {
    this.categoriesService.getMajorCategories().subscribe( (values: string[]) => this._majorCategories.next(values));
  }

  public getMinorCategories() {
    this.categoriesService.getMinorCategories().subscribe( (values: Map<string, string[]>) => this._minorCategories.next(values));
  }

  public setMajorCategory(category: string) {
    this._majorCategory.next(category);
  }
}

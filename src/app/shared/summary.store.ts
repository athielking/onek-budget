import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest, Subject, forkJoin } from 'rxjs';
import { CategoriesService } from './categories.service';
import { Summary } from '../models/summary.model';
import { SummaryService } from './summary.service';
import { Moment } from 'moment';
import { StorageService } from './storage.service';
import { StorageKeys } from './constants';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SummaryStore {

  private _typeSummary: BehaviorSubject<Summary[]> = new BehaviorSubject([]);
  private _categorySummary: BehaviorSubject<Summary[]> = new BehaviorSubject([]);

  private _summaryTree: Subject<Summary[]> = new Subject<Summary[]>();

  public typeSummary$: Observable<Summary[]> = this._typeSummary.asObservable();
  public categorySummary$: Observable<Summary[]> = this._categorySummary.asObservable();

  public summaryTree$: Observable<Summary[]> = this._summaryTree.asObservable();

  constructor(private summaryService: SummaryService,
              private storageService: StorageService) {

    this.storageService.itemChanged.pipe(filter( key => key === StorageKeys.viewDate )).subscribe(key => {
      this.loadSummaries();
    });
  }

  public loadSummaryTree() {
    const viewDate = this.getViewDate();

    const all = forkJoin(
      this.summaryService.getTypeAggregations(viewDate),
      this.summaryService.getCategoryByTypeAggregations(viewDate),
      this.summaryService.getSubcategoryByTypeAggregations(viewDate)
    );

    all.subscribe( result => {
      const types = result[0];
      const categories = result[1];
      const subCategories = result[2];

      subCategories.forEach( s => {
        const cat = categories.find( c => c.type === s.type && c.category === s.category);
        if (cat) {
          cat.children.push(s);
        }
      });

      categories.forEach( c => {
        const type = types.find( t => t.type === c.type );
        if (type) {
          type.children.push(c);
        }
      });

      this._summaryTree.next(types);
    });
  }

  public loadSummaries() {
    this.getSummariesByCategory();
    this.getSummariesByType();
  }

  public getSummariesByType() {
    this.summaryService.getTypeAggregations(this.getViewDate()).subscribe( (values: Summary[]) => this._typeSummary.next(values));
  }

  public getSummariesByCategory() {
    this.summaryService.getCategoryAggregations(this.getViewDate()).subscribe( (values: Summary[]) => this._categorySummary.next(values));
  }

  private getViewDate() {
    let viewDate = moment();

    if ( this.storageService.getItem(StorageKeys.viewDate) ) {
      viewDate = moment(this.storageService.getItem(StorageKeys.viewDate));
    }

    return viewDate;
  }
}

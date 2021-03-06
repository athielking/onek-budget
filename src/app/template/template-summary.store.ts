import { Injectable } from '@angular/core';
import { filter, finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { Summary } from '../models/summary.model';
import { TemplateSummaryService } from './template-summary.service';
import { StorageService } from '../shared/storage.service';
import { StorageKeys } from '../shared/constants';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TemplateSummaryStore {

  private _typeSummary: BehaviorSubject<Summary[]> = new BehaviorSubject([]);
  private _typeLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private _categorySummary: BehaviorSubject<Summary[]> = new BehaviorSubject([]);
  private _categoriesLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private _summaryTree: BehaviorSubject<Summary[]> = new BehaviorSubject<Summary[]>([]);
  private _treeLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public typeSummary$: Observable<Summary[]> = this._typeSummary.asObservable();
  public typeLoading$: Observable<boolean> = this._typeLoading.asObservable();

  public categorySummary$: Observable<Summary[]> = this._categorySummary.asObservable();
  public categoriesLoading$: Observable<boolean> = this._categoriesLoading.asObservable();

  public summaryTree$: Observable<Summary[]> = this._summaryTree.asObservable();
  public treeLoading$: Observable<boolean> = this._treeLoading.asObservable();

  constructor(private summaryService: TemplateSummaryService) {
  }

  public loadAll() {
    this.loadSummaries();
    this.loadSummaryTree();
  }

  public loadSummaryTree() {
    this._treeLoading.next(true);

    const all = forkJoin(
      this.summaryService.getTypeAggregations(),
      this.summaryService.getCategoryByTypeAggregations(),
      this.summaryService.getSubcategoryByTypeAggregations()
    );

    all.pipe( finalize( () => this._treeLoading.next(false) ) )
      .subscribe( result => {
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
    this._typeLoading.next(true);

    this.summaryService.getTypeAggregations()
      .pipe(finalize(() => this._typeLoading.next(false)))
      .subscribe( (values: Summary[]) => this._typeSummary.next(values));
  }

  public getSummariesByCategory() {
    this._categoriesLoading.next(true);

    this.summaryService.getCategoryAggregations()
      .pipe(finalize(() => this._categoriesLoading.next(false)))
      .subscribe( (values: Summary[]) => this._categorySummary.next(values));
  }
}

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Moment } from 'moment';
import { Summary } from '../models/summary.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateSummaryService {

  private serviceUri = 'http://localhost:4040/api/agg/temp';
  constructor(private httpClient: HttpClient) {}

  public getTypeAggregations() {
    return this.getAggregate('type');
  }

  public getCategoryAggregations() {
    return this.getAggregate('category');
  }

  public getSubcategoryAggregations() {
    return this.getAggregate('subcategory');
  }

  public getSubcategoryByTypeAggregations() {
    return this.getAggregate('subcategoryByType');
  }

  public getCategoryByTypeAggregations() {
    return this.getAggregate('categoryByType');
  }

  private getAggregate(aggType: string) {
    const endpoint =  this.serviceUri + `/${aggType}`;
    return this.httpClient.get(endpoint).pipe(
      map( (data: any[]) => data.map( el => new Summary(el)))
    );
  }
}

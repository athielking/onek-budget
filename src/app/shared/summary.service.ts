import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Moment } from 'moment';
import { Summary } from '../models/summary.model';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  private serviceUri = 'http://localhost:4040/api/agg';
  constructor(private httpClient: HttpClient) {}

  public getTypeAggregations(viewDate: Moment) {
    return this.getAggregate(viewDate, 'type');
  }

  public getCategoryAggregations(viewDate: Moment) {
    return this.getAggregate(viewDate, 'category');
  }

  public getSubcategoryAggregations(viewDate: Moment) {
    return this.getAggregate(viewDate, 'subcategory');
  }

  public getSubcategoryByTypeAggregations(viewDate: Moment) {
    return this.getAggregate(viewDate, 'subcategoryByType');
  }

  public getCategoryByTypeAggregations(viewDate: Moment) {
    return this.getAggregate(viewDate, 'categoryByType');
  }

  private getAggregate(viewDate: Moment, aggType: string) {
    const endpoint =  this.serviceUri + `/${aggType}?date=${viewDate.format('YYYY-MM-DD')}`;
    return this.httpClient.get(endpoint).pipe(
      map( (data: any[]) => data.map( el => new Summary(el)))
    );
  }
}

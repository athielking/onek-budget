import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, filter } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';
import { TransactionType } from '../shared/constants';
import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private serviceUri = 'http://localhost:4040/api/trans';
  constructor(private httpClient: HttpClient) { }

  public getTransactions( viewDate: Moment ) {
    return this.httpClient.get(this.serviceUri).pipe(
      map( (data: Object[]) => data.map( el => {
        if (el['date']) {
          el['date'] = moment(el['date']);
        }
        return new Transaction(el);
      }).filter( trans => trans.date.month === viewDate.month))
    );
  }

  public addTransaction(transaction: Transaction) {
    return this.httpClient.post(this.serviceUri, transaction).pipe(shareReplay());
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';
import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private serviceUri = 'http://localhost:4040/api/trans';
  // private serviceUri = 'https://api.myjson.com/bins/za91w';
  constructor(private httpClient: HttpClient) { }

  public getTransactions( viewDate: Moment ) {

    const endpoint = this.serviceUri + `?date=${viewDate.format('YYYY-MM-DD')}`;
    return this.httpClient.get(endpoint).pipe(
      map( (data: any[]) => data.map( el => {
        if (el['date']) {
          el['date'] = moment(el['date']);
        }

        if (el.majorcategory) {
          el.category = el.majorcategory;
          delete el.majorcategory;
        }

        return new Transaction(el);
      }))
    );
  }

  public addTransaction(transaction: Transaction) {
    delete transaction._status;

    return this.httpClient.post(this.serviceUri, transaction).pipe(shareReplay());
  }

  public deleteTransaction(id: string) {
    return this.httpClient.delete(this.serviceUri + `/${id}`).pipe(shareReplay());
  }

  public patchTransaction(id: string, changes: any) {
    return this.httpClient.patch(this.serviceUri + `/${id}`, changes)
      .pipe(shareReplay(),
        map(trans => {
          if (trans['date']) {
            trans['date'] = moment(trans['date']);
          }
          return new Transaction(trans);
        }));
  }
}

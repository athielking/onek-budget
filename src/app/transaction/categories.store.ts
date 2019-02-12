import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from './transaction.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesStore {

  public majorCategories$: Observable<string[]>;
  public minorCategories$: Observable<Map<string, string[]>>;
  private transactions$: Observable<Transaction[]>;

  constructor(private transactionService: TransactionService) {
    this.transactions$ = transactionService.getTransactions();

    this.majorCategories$ = this.transactions$.pipe(
      map(trans => trans.map(t => t.majorcategory).filter((v, i, a) => a.indexOf(v) === i)));

    this.minorCategories$ = this.transactions$.pipe(map(trans => {
      const subCategories = new Map<string, string[]>();

      trans.forEach( t => {
        if (!subCategories.has(t.majorcategory)) {
          subCategories.set(t.majorcategory, []);
        }

        const arry = subCategories.get(t.majorcategory);
        if ( arry.indexOf( t.subcategory ) < 0) {
          arry.push(t.subcategory);
          subCategories.set(t.majorcategory, arry);
        }
      });

      return subCategories;
    }));

  }

  public getMinorCategories(rowData: Transaction): Observable<string[]> {
    return this.minorCategories$.pipe(map(m => m.has(rowData.majorcategory) ? m.get(rowData.majorcategory) : []));
  }


}

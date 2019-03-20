import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction.model';


import { LinkStore } from '../../shared/link.store';

@Component({
  selector: 'okb-template-transaction',
  templateUrl: './template-transaction.component.html'
})
export class TemplateTransactionComponent implements OnInit {

  @Input() summaryType: String;
  public unMatched$: Observable<Transaction[]>;
  public loading$: Observable<boolean>;

  public gainLoss = 0;

  constructor(private linkStore: LinkStore ) {

    this.loading$ = linkStore.loading$;
    this.unMatched$ = linkStore.unMatched$;
  }

  ngOnInit() {
    this.linkStore.loadTransactionsAndTemplates();
  }

  addTransactionFromTemplate(temp: Transaction) {
    this.linkStore.addTransactionFromTemplate(temp);
  }

}

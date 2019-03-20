import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Summary } from '../../models/summary.model';
import { TransactionSummaryStore } from '../transaction-summary.store';

@Component({
  selector: 'okb-total-spend-save',
  templateUrl: './total-spend-save.component.html'
})
export class TotalSpendSaveComponent implements OnInit {

  @Input() summaryType: String;
  public summaryData$: Observable<Summary[]>;
  public loading$: Observable<boolean>;

  public gainLoss = 0;

  constructor(private summaryStore: TransactionSummaryStore) {
    this.summaryData$ = this.summaryStore.typeSummary$;
    this.summaryData$.subscribe( summaries => this.gainLoss = summaries.map( s => s.total).reduce( (total, num) => total + num, 0));

    this.loading$ = this.summaryStore.typeLoading$;
  }

  ngOnInit() {
    this.summaryStore.loadSummaries();
  }

}

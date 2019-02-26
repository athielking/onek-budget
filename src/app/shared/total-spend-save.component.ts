import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Summary } from '../models/summary.model';
import { SummaryStore } from './summary.store';

@Component({
  selector: 'okb-total-spend-save',
  templateUrl: './total-spend-save.component.html'
})
export class TotalSpendSaveComponent implements OnInit {

  @Input() summaryType: String;
  public summaryData$: Observable<Summary[]>;

  public gainLoss = 0;

  constructor(private summaryStore: SummaryStore) {
    this.summaryData$ = this.summaryStore.typeSummary$;
    this.summaryData$.subscribe( summaries => this.gainLoss = summaries.map( s => s.total).reduce( (total, num) => total + num, 0));
  }

  ngOnInit() {
    this.summaryStore.loadSummaries();
  }

}

import { Component, OnInit } from '@angular/core';
import { TemplateStore } from '../shared/template.store';
import { Observable } from 'rxjs';
import { TemplateSummaryStore } from './template-summary.store';
import { TransactionType } from '../shared/constants';

@Component({
  selector: 'okb-template-summary',
  templateUrl: './template-summary.component.html',
  styles: []
})
export class TemplateSummaryComponent implements OnInit {

  public totalExpenses: number;
  public totalIncome: number;
  public netGainLoss: number;

  public loading$: Observable<boolean>;
  constructor(private summaryStore: TemplateSummaryStore) {
    this.loading$ = summaryStore.typeLoading$;

    this.summaryStore.typeSummary$.subscribe(summaries => {

      setTimeout(() => {
        this.totalIncome = summaries.filter( s => s.type === TransactionType.Income )
          .reduce( (total, current) => total + current.total, 0);

        this.totalExpenses = summaries.filter( s => s.type !== TransactionType.Income )
          .reduce( (total, current) => total + current.total, 0);

        this.netGainLoss = this.totalIncome + this.totalExpenses;
      });

    });
  }

  ngOnInit() {
    this.summaryStore.loadSummaries();
  }

}


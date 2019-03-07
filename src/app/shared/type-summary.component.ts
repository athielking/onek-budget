import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Summary } from '../models/summary.model';
import { SummaryStore } from './summary.store';

@Component({
  selector: 'okb-type-summary',
  templateUrl: './type-summary.component.html',
  styleUrls: ['./type-summary.component.scss']
})
export class TypeSummaryComponent implements OnInit {

  @Input() summaryType: String;
  public summaryData$: Observable<Summary[]>;
  public loading$: Observable<boolean>;

  constructor(private summaryStore: SummaryStore) {
    this.summaryData$ = this.summaryStore.summaryTree$;
    this.loading$ = this.summaryStore.treeLoading$;
  }

  ngOnInit() {
    this.summaryStore.loadSummaryTree();
  }
}

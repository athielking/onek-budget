import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { TransactionType } from 'src/app/shared/constants';
import { CategoriesStore } from '../categories.store';
import { TransactionService } from '../transaction.service';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'okb-add-transaction-renderer',
  templateUrl: './add-transaction-renderer.component.html',
  styleUrls: ['./add-transaction-renderer.component.scss']
})
export class AddTransactionRendererComponent implements ICellRendererAngularComp, OnInit {

  public form = new FormGroup({
    date: new FormControl(moment()),
    payee: new FormControl(''),
    amount: new FormControl(null),
    type: new FormControl(TransactionType.Optional),
    majorcategory: new FormControl(''),
    subcategory: new FormControl('')
  });

  public transactionTypes: string[] = Object.keys(TransactionType);
  public subCategories: string[] = [];
  public minorMap: Map<string, string[]>;

  public expanded = false;
  public params: any;
  public onExpand = new EventEmitter<boolean>();

  constructor(public categoriesStore: CategoriesStore,
              public transactionService: TransactionService) { }

  agInit(params: any): void {
    this.params = params;
  }

  ngOnInit() {
    this.categoriesStore.minorCategories$.subscribe(m => this.minorMap = m);

    this.form.controls.majorcategory.valueChanges.subscribe( value => {
      if ( this.minorMap.has(value) ) {
        this.subCategories = this.minorMap.get(value);
      }
    });
  }

  refresh(): boolean {
    return false;
  }

  toggleTransactionForm(expanded: boolean) {
    this.expanded = expanded;

    const height = this.expanded ? 198 : 36;
    this.params.node.setRowHeight(height);
    this.params.api.onRowHeightChanged();

    this.params.context.parent.togglePinnedDiv(expanded);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    event.stopPropagation();
  }

  onSubmit() {
    this.transactionService.addTransaction(new Transaction(this.form.value)).subscribe( result => alert('added'));
  }

  @HostListener('dblclick', ['$event'])
  onDoubleClick(event) {
    event.stopPropagation();
    this.toggleTransactionForm(true);
  }
}

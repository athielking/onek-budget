import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';

import { map, filter, finalize } from 'rxjs/operators';
import { StorageService } from '../shared/storage.service';

import { Template } from '../models/template.model';
import { TemplateService } from './template.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import { StorageKeys } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class TemplateStore {

  private _templates: BehaviorSubject<Template[]> = new BehaviorSubject([]);
  private _templatesLoading: BehaviorSubject<boolean> = new BehaviorSubject(true);

  private _templateTransactions: BehaviorSubject<Transaction[]> = new BehaviorSubject([]);
  private _templateTransactionsLoading: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public templates$: Observable<Template[]>;
  public templatesLoading$: Observable<boolean> = this._templatesLoading.asObservable();

  public templateTransactions$: Observable<Transaction[]> = this._templateTransactions.asObservable();
  public templateTransactionsLoading$: Observable<boolean> = this._templateTransactionsLoading.asObservable();

  private _changes: Map<string, any>;
  private _changeDebounce = 5000;
  private _changeTimer;

  constructor(private templateService: TemplateService,
              private storageService: StorageService) {

    this._changes = new Map<string, any>();

    this.templates$ = this._templates.asObservable().pipe(
      map(values => values.sort((a: Template, b: Template) => a.day > b.day ? 1 : a.day < b.day ? -1 : 0 )));

    this.storageService.itemChanged.pipe(
      filter( key => key === StorageKeys.viewDate )
    ).subscribe(() => this.getTemplateTransactions());
  }

  public getTemplates() {
    this._templatesLoading.next(true);
    this._templateTransactionsLoading.next(true);

    this.templateService.getTemplates()
    .pipe(finalize(() => this._templatesLoading.next(false)))
    .subscribe( data => {
      this._templates.next(data);
      this.getTemplateTransactions();
    });
  }

  public addTemplate(template: Template) {
    const values = this._templates.getValue();

    this._templates.next([...values, template]);

    this.templateService.addTemplate(template).subscribe( (result: any) => {
      template._id = result['_id'];
      this._templates.next([...values, template]);
    });
  }

  public queueChange(id: string, changes: any) {
    if (this._changeTimer) {
      clearTimeout(this._changeTimer);
    }

    if (this._changes.has(id)) {
      const existing = this._changes.get(id);
      changes = Object.assign(existing, changes);
    }

    this._changes.set(id, changes);

    this._changeTimer = setTimeout(() => {
      forkJoin(Array.from(this._changes.entries()).map( kvp => this.templateService.patchTemplate(kvp[0], kvp[1])))
      .subscribe(result => {
        this._changes.clear();
        clearTimeout(this._changeTimer);
      });
    }, this._changeDebounce);
  }

  public getTemplateTransactions() {
    if (!this._templateTransactionsLoading.getValue()) {
      this._templateTransactionsLoading.next(true);
    }

    let viewDate = moment();
    if (this.storageService.getItem(StorageKeys.viewDate)) {
      viewDate = moment(this.storageService.getItem(StorageKeys.viewDate, true));
    }

    const templates = this._templates.getValue();
    const transactions = [];

    templates.forEach( template => {
      const recurrence = moment.duration(template.recur, template.recurrencePeriod);

      const sMonth  = viewDate.clone().date(1);
      const eMonth = viewDate.clone().date(viewDate.daysInMonth());

      const start = template.recurrenceStart.clone().date(template.day);

      while (start.isBefore(eMonth)) {
        if (start.isAfter(sMonth)) {
          transactions.push(new Transaction({
            _id: template._id,
            amount: template.amount,
            category: template.category,
            date: start.clone(),
            payee: template.payee,
            type: template.type,
            subcategory: template.subcategory
          }));
        }

        start.add(recurrence);
      }

    });

    this._templateTransactions.next(transactions);
    this._templateTransactionsLoading.next(false);
  }
}

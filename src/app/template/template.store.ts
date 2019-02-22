import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';

import { map } from 'rxjs/operators';
import { StorageService } from '../shared/storage.service';

import { Template } from '../models/template.model';
import { TemplateService } from './template.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateStore {

  private _templates: BehaviorSubject<Template[]> = new BehaviorSubject([]);
  public templates$: Observable<Template[]>;

  private _changes: Map<string, any>;
  private _changeDebounce = 5000;
  private _changeTimer;

  constructor(private templateService: TemplateService) {

    this._changes = new Map<string, any>();

    this.templates$ = this._templates.asObservable().pipe(
      map(values => values.sort((a: Template, b: Template) => a.day > b.day ? 1 : a.day < b.day ? -1 : 0 )));

  }

  public getTemplates() {
    this.templateService.getTemplates().subscribe( data => this._templates.next(data) );
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
}

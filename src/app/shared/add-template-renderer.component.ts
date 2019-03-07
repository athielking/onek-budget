import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { TransactionType} from 'src/app/shared/constants';
import { CategoriesStore } from './categories.store';
import { AddRecordRendererComponent } from './add-record-renderer.component';
import { TemplateStore } from '../template/template.store';
import { Template } from '../models/template.model';

@Component({
  selector: 'okb-add-template-renderer',
  templateUrl: './add-template-renderer.component.html',
  styleUrls: ['./add-record-renderer.component.scss']
})
export class AddTemplateRendererComponent extends AddRecordRendererComponent implements OnInit {

  constructor(public categoriesStore: CategoriesStore,
              public templateStore: TemplateStore) {
    super(categoriesStore);
  }

  ngOnInit() {
    super.ngOnInit();

    this.subscribeCategoryChanges(<FormControl>this.form.controls.category);
    this.subscribeSimpleEvaluator(<FormControl>this.form.controls.amount);
  }

  onSubmit() {
    const temp = new Template(this.form.value);
    temp.amount = Math.abs(temp.amount);

    if ( temp.type !== TransactionType.Income) {
      temp.amount *= -1;
    }

    this.templateStore.addTemplate(temp);
    this.form.reset(this.initialState);
  }

  initFormGroup() {
    return new FormGroup({
      day: new FormControl(null, [Validators.max(31), Validators.min(1), Validators.required, Validators.pattern(/\d+/)]),
      payee: new FormControl(''),
      amount: new FormControl(null,
      {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      type: new FormControl(TransactionType.Optional),
      category: new FormControl(''),
      subcategory: new FormControl(''),
      recur: new FormControl(1),
      recurrencePeriod: new FormControl('months'),
      recurrenceStart: new FormControl(moment().date(1).month(1))
    });
  }
}

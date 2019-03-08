import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TemplateListComponent } from './template-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TemplateListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: TemplateListComponent }
    ])
  ],
  providers: [
  ],
  bootstrap: [],
  exports: [
  ]
})
export class TemplateModule { }

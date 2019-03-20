import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TemplateListComponent } from './template-list.component';
import { RouterModule } from '@angular/router';
import { TemplateSummaryService } from './template-summary.service';
import { TemplateSummaryStore } from './template-summary.store';
import { AuthGuard } from '../core/auth.guard';
import { TemplateSummaryComponent } from './template-summary.component';

@NgModule({
  declarations: [
    TemplateListComponent,
    TemplateSummaryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: TemplateListComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [
    TemplateSummaryService,
    TemplateSummaryStore
  ],
  bootstrap: [],
  exports: [
  ]
})
export class TemplateModule { }

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AbsolutePipe } from './absolute.pipe';


@NgModule({
  declarations: [
    AbsolutePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ClarityModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [
    HttpClientModule,
    ClarityModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AbsolutePipe
  ]
})
export class CoreModule { }

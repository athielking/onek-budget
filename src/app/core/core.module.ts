import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ClarityModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [
    HttpClientModule,
    ClarityModule
  ]
})
export class CoreModule { }

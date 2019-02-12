import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

import { MatDatepickerModule, MatInputModule, MatFormFieldModule,
         MatSelectModule, MatAutocompleteModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatDatepickerModule, MatInputModule, MatMomentDateModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule, MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [],
  exports: [
    CoreModule,
    MatDatepickerModule, MatInputModule, MatMomentDateModule, MatSelectModule, MatAutocompleteModule, MatButtonModule,
    MatIconModule
  ]
})
export class SharedModule { }

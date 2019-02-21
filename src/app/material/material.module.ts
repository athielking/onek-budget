import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule
} from '@angular/material';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatDatepickerModule, MatInputModule, MatMomentDateModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule, MatButtonModule,
    MatIconModule,
  ],
  providers: [
  ],
  bootstrap: [],
  exports: [
    MatDatepickerModule, MatInputModule, MatMomentDateModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule, MatButtonModule,
    MatIconModule,
  ]
})
export class MaterialModule { }

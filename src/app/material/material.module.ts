import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatDatepickerModule, MatInputModule, MatMomentDateModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule, MatButtonModule,
    MatIconModule, MatMenuModule, MatDialogModule,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {disableClose: true, hasBackdrop: true}}
  ],
  bootstrap: [],
  exports: [
    MatDatepickerModule, MatInputModule, MatMomentDateModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule, MatButtonModule,
    MatIconModule, MatMenuModule, MatDialogModule,
  ]
})
export class MaterialModule { }

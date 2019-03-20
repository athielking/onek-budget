import { Component, OnInit, Input, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'okb-delete-prompt',
  templateUrl: './delete-prompt.component.html',
  styles: []
})
export class DeletePromptComponent {

  @Input()
  public recordType: String = 'Transaction';
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    if (data) {
      this.recordType = data.recordType ? data.recordType : 'record';
    }
  }
}

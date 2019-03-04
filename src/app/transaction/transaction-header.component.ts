import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { StorageService } from '../shared/storage.service';
import { StorageKeys } from '../shared/constants';


@Component({
  selector: 'okb-transaction-header',
  templateUrl: './transaction-header.component.html',
  styleUrls: ['./transaction-header.component.scss']
})
export class TransactionHeaderComponent implements OnInit {

  public viewDate: Moment;
  @Output()
  public togglePinnedDiv: EventEmitter<boolean> = new EventEmitter();

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.viewDate = moment(this.storageService.getItem(StorageKeys.viewDate));
    if ( !this.viewDate.isValid() ) {
      this.viewDate = moment();
      this.storageService.setItem(StorageKeys.viewDate, this.viewDate);
    }
  }

  public increaseViewDate() {
    this.viewDate.add(1, 'month');
    this.storageService.setItem(StorageKeys.viewDate, this.viewDate);
  }

  public decreaseViewDate() {
    this.viewDate.subtract(1, 'month');
    this.storageService.setItem(StorageKeys.viewDate, this.viewDate);
  }

  public onAddClick() {
    this.togglePinnedDiv.emit(true);
  }
}

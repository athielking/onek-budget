import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'okb-transaction-header',
  templateUrl: './transaction-header.component.html',
  styleUrls: ['./transaction-header.component.scss']
})
export class TransactionHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public increaseViewDate() {}

  public decreaseViewDate() {}
}

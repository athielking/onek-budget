import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Transaction } from './models/transaction.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'okb-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'onek-budget';

  columnDefs = Transaction.getGridView();
  rowData: Observable<Transaction[]>;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.rowData = this.http.get('https://api.myjson.com/bins/za91w').pipe(
      map( data => (<Array<any>>data).map( obj => new Transaction(obj))));
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TransactionModule } from './transaction/transaction.module';
import { TemplateModule } from './template/template.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    TransactionModule,
    TemplateModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'transaction', pathMatch: 'full' },
      { path: 'transaction', loadChildren: () => TransactionModule },
      { path: 'template', loadChildren: () => TemplateModule },
      { path: 'user', loadChildren: () => UserModule },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotTableModule, HotTableRegisterer } from '@handsontable/angular';
import { HandsonTableComponent } from './handson-table/handson-table.component';
import { FormsModule } from '@angular/forms';
import { IgniteuiAngularComponent } from './igniteui-angular/igniteui-angular.component';
import { WIPComponent } from './wip/wip.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { Wip2Component } from './wip2/wip2.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { CurrencyPipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    HandsonTableComponent,
    IgniteuiAngularComponent,
    WIPComponent,
    Wip2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HotTableModule,
    FormsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule
  ],
  providers: [HotTableRegisterer,CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }




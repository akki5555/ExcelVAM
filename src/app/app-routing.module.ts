import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HandsonTableComponent } from './handson-table/handson-table.component';
import { IgniteuiAngularComponent } from './igniteui-angular/igniteui-angular.component';
import { WIPComponent } from './wip/wip.component';
import { Wip2Component } from './wip2/wip2.component';

const routes: Routes = [
  { path: '', component: Wip2Component },
  { path: 'Home', component: IgniteuiAngularComponent },
  { path: 'Home1', component: HandsonTableComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

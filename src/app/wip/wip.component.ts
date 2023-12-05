import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
import { AfterViewInit, ViewChild } from '@angular/core';
import * as Handsontable from "handsontable";
import { ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

registerAllModules();

@Component({
  selector: 'app-wip',
  templateUrl: './wip.component.html',
  styleUrls: ['./wip.component.scss']
})
export class WIPComponent implements OnInit,AfterViewInit {
  @ViewChild('hotTable') hotTable: any;
  private hotInstance = "myTable";
  private myTable:any;


//  [12,'data', 121, '11/29/2021','11/29/2021','11/29/2021','No','12%'],
  public hotSettings: Handsontable.default.GridSettings = {
   // data: Handsontable.default.helper.createSpreadsheetData(10, 2),
    // rowHeaders: true,
    licenseKey: "non-commercial-and-evaluation",
    data:[ [12,'data', 121, 111, 100, 100 ,'No','12%'],[]],
    colHeaders: ['Job ID', 'Job Description', 'Contract Price','Billed to date', 'Cost to Date', 'Cost to Complete','Bonded?', 'Arch Percentage' ],
    stretchH: 'all',
    height: 'auto',
    columns:[{data:0 ,type: 'numeric', format:'0,0'},{data:1, type:'text'},{data: 2, type:'numeric',format:'0,0.00 $'},{data: 3, type:'numeric'},{data: 4, type:'numeric'},{data: 5,type:'numeric'},{data: 6,type:'text'},{data: 7,type:'text'}]
  };

// , renderer: this.currencyRender 
 unitPriceTotal: number = 0;
 unitTotal: number = 0;
 zTotal: number = 0;
 

 constructor(private hotTableRegisterer: HotTableRegisterer,private ref: ChangeDetectorRef) { }

 ngOnInit(): void { 
   const data = this.hotSettings?.data ?? [];
   data.forEach((element, i) => {
    debugger
      this.unitTotal += Number(element[2]);
      this.unitPriceTotal += Number(element);
      this.zTotal += Number(element);
   });
   console.log(this.unitTotal);
   console.log(this.unitPriceTotal);
   console.log(this.zTotal);
 }



 ngAfterViewInit(): void {
  this.myTable = this.hotTableRegisterer.getInstance(this.hotInstance);
    this.myTable.setCellMeta(0, 0, "meta", { test: "hello" });
    
  //  const hotInstance = this.hotTable.hotInstance;

   this.myTable.addHook('afterPaste', (data: any, coords: any) => {
     console.log('Paste event data:', data);
   
     // Initialize variables
     this.unitTotal = 0;
     this.unitPriceTotal = 0;
     this.zTotal = 0;
   
     data.forEach((x: any[]) => {
       this.unitTotal += Number(x[2]);
       this.unitPriceTotal += Number(x[3]);
       this.zTotal += Number(x[4]);
     });
     this.unitTotal =  this.unitTotal;
     this.ref.detectChanges();
     console.log(this.unitTotal);
     console.log(this.unitPriceTotal);
     console.log(this.zTotal);
     console.log('Paste event coordinates:', coords);
   });
 }

 save(){
  console.log(this.hotSettings.data);
 }
   
 public reset() {
  this.unitTotal = 0;
  this.unitPriceTotal = 0;
  this.zTotal = 0;
  this.myTable.updateSettings({
    data:[
      [12,'data', 121, '11/29/2021','11/29/2021','11/29/2021','No','12%']
    ]
  });
  const data = this.hotSettings?.data ?? [];
  data.forEach((element, i) => {
   debugger
     this.unitTotal += Number(element[2]);
     this.unitPriceTotal += Number(element);
     this.zTotal += Number(element);
  });
  console.log(this.unitTotal);
  console.log(this.unitPriceTotal);
  console.log(this.zTotal);
}
 remove(index:number) {
 this.hotSettings.data?.splice(index,1);
 this.refreshHandsonTable();

}

ngOnChanges(changes: SimpleChanges) {
// 
  console.log(changes)
  console.log(this.unitTotal);
  this.unitTotal = this.unitTotal;
}
 
addRows(){
  this.hotSettings.data?.push([]);
  console.log('add',this.hotSettings.data);
  this.refreshHandsonTable();
}
refreshHandsonTable(){
    this.myTable.updateSettings({
      data:this.hotSettings.data
    });
}

}

import { Component, OnInit } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry';
import { AfterViewInit, ViewChild } from '@angular/core';

registerAllModules();

@Component({
  selector: 'app-handson-table',
  templateUrl: './handson-table.component.html',
  styleUrls: ['./handson-table.component.scss']
})
export class HandsonTableComponent implements OnInit, AfterViewInit  {

  @ViewChild('hotTable') hotTable: any;

   hotSettings: Handsontable.GridSettings = {
    data:[
      {id: 1, name: 'Ted Right', Unit: 2, UnitPrice:1.99,  ZipCode:411047},
      {id: 2, name: 'Frank Honest', Unit:5, UnitPrice:19.99,  ZipCode:411047},
      {id: 3, name: 'Joan Well', Unit: 1, UnitPrice:4.99,  ZipCode:411047},
      {id: 4, name: 'Gail Polite', Unit:8 , UnitPrice:2.99,  ZipCode:411047},
      {id: 5, name: 'Michael Fair', Unit:12 , UnitPrice:18.99,  ZipCode:411047},
      {id: 6, name: 'Mia Fair', Unit:23 , UnitPrice:10.98,  ZipCode:411047},
      {id: 7, name: 'Cora Fair', Unit: 24, UnitPrice:11.25,  ZipCode:411047},
      {id: 8, name: 'Jack Right', Unit: 14, UnitPrice:12.58,  ZipCode:411047},
    ],
    colHeaders: ['ID', 'Full name', 'Unit','Unit Price', 'Zip Code', ],
    stretchH: 'all',
    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
  
  };

  unitPriceTotal: number = 0;
  unitTotal: number = 0;
  zTotal: number = 0;
  

  constructor() { }

  ngOnInit(): void { 
    const data = this.hotSettings?.data ?? [];
    data.forEach(element => {
       this.unitTotal += Number(element['Unit']);
       this.unitPriceTotal += Number(element['UnitPrice']);
       this.zTotal += Number(element['ZipCode']);
    });
    console.log(this.unitTotal);
    console.log(this.unitPriceTotal);
    console.log(this.zTotal);
  }


  ngAfterViewInit(): void {
    const hotInstance = this.hotTable.hotInstance;

    hotInstance.addHook('afterPaste', (data: any, coords: any) => {
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
    
      console.log(this.unitTotal);
      console.log(this.unitPriceTotal);
      console.log(this.zTotal);
      console.log('Paste event coordinates:', coords);
    });
  }

  save(){
   console.log(this.hotSettings.data);
  }
    
  
}

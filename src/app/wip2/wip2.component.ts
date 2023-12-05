import { AfterViewInit, Component, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as Handsontable from "handsontable";
import { registerAllModules } from 'handsontable/registry';
import { ChangeDetectorRef } from '@angular/core';
import { HotTableComponent, HotTableRegisterer } from '@handsontable/angular';
import { RowObject } from 'handsontable/common';

registerAllModules();

@Component({
  selector: 'app-wip2',
  templateUrl: './wip2.component.html',
  styleUrls: ['./wip2.component.scss']
})
export class Wip2Component implements OnInit, AfterViewInit {
  private hotInstance = "myTable";
  private myTable: any;
  

  public hotSettings: Handsontable.default.GridSettings = {

    licenseKey: "non-commercial-and-evaluation",
    data: [[null, '12', 'data', 121, 111, 100, 100, 'No', '12%']],
    colHeaders: ['Action', 'Job ID', 'Job Description', 'Contract Price', 'Billed to date', 'Cost to Date', 'Cost to Complete', 'Bonded?', 'Arch Percentage'],
    stretchH: 'all',
    height: 'auto',

    afterOnCellMouseDown:  (event, coords, TD,) => {
      if (event.target instanceof HTMLElement){
        const targetClassList = Array.from(event.target.classList).filter((item)=> item !== '');
        if(targetClassList[0] == 'add'){
         this.addRow(coords.row);          
        }else if(targetClassList[0] == 'remove'){
          this.remove(coords.row);
        }
      }
    },
    columns: [
      { data: 'action', title:'action', renderer: this.actionRender, editor:false, readOnly: true },
      { data: 1, type: 'text'},
      { data: 2, type: 'text' },
      {
        data: 3, type: 'numeric', numericFormat:
        {
          pattern: '$0,0.00',
          culture: 'en-US'
        }
      },
      {
        data: 4, type: 'numeric',
        numericFormat:
        {
          pattern: '$0,0.00',
          culture: 'en-US'
        }
      },
      {
        data: 5, type: 'numeric', numericFormat:
        {
          pattern: '$0,0.00',
          culture: 'en-US'
        }
      },
      {
        data: 6, type: 'numeric',
        numericFormat:
        {
          pattern: '$0,0.00',
          culture: 'en-US'
        }
      },
      { data: 7, type: 'text' },
      { data: 8, type: 'text' },
    ],
    // cell: this.customCellRender.bind(this)
    
  };

  public totalContractPrice = 0;
  public totalBilledToDate = 0;
  public totalCostToDate = 0;
  public totalCostToComplete = 0;
  public wipTableData = this.hotSettings?.data ?? [];

  constructor(private hotTableRegisterer: HotTableRegisterer, private ref: ChangeDetectorRef, private ngZone :NgZone) { }

  ngOnInit() {
    this.wipTableData.forEach((element, i) => {
      this.totalContractPrice += Number(element[3]);
      this.totalBilledToDate += Number(element[4]);
      this.totalCostToDate += Number(element[5]);
      this.totalCostToComplete += Number(element[6]);
    });
  }

  // customCellRender(instance: any, td: any, row: number, col: number, prop: any, value: any, cellProperties: any) {
  //   const allIds= this.hotSettings?.data?.map(row => row[1]) || [];
  //   const currentId = value;
  //   const isduplicate = allIds?.filter(id => id === currentId).length > 1
  // }

//   customNumberValidator(value: any, callback: (arg0: boolean) => void) {
//     const columnIndex =  this.myTable.getData();
//     console.log(columnIndex);
//     const isUnique = columnIndex.filter( (num: any[]) => num[1] === value).length === 1;
//     console.log(columnIndex.filter( (num: any[]) => num[1] === value));
//     console.log(isUnique)
//     callback(isUnique)

//  }

  ngAfterViewInit(): void {

    this.myTable = this.hotTableRegisterer.getInstance(this.hotInstance);
    this.myTable.addHook('afterPaste', (data: any, coords: any) => {
      this.totalContractPrice = 0;
      this.totalBilledToDate = 0;
      this.totalCostToDate = 0;
      this.totalCostToComplete = 0;
      data.forEach((x: any[]) => {
        this.totalContractPrice += Number(x[3]);
        this.totalBilledToDate += Number(x[4]);
        this.totalCostToDate += Number(x[5]);
        this.totalCostToComplete += Number(x[6]);
      });
      this.ref.detectChanges();
    });

    this.myTable.addHook('afterChange', (changes: any[], source: string) => {
      // if (source !== 'loadData') {
        const valueAfterChange = this.myTable.getData()
        debugger;
        this.totalContractPrice = 0;
        this.totalBilledToDate = 0;
        this.totalCostToDate = 0;
        this.totalCostToComplete = 0;
        valueAfterChange.forEach((x: any[]) => {
          this.totalContractPrice += Number(x[3]);
          this.totalBilledToDate += Number(x[4]);
          this.totalCostToDate += Number(x[5]);
          this.totalCostToComplete += Number(x[6]);
        });
        this.ref.detectChanges();
      // }

    });
  }


  actionRender(instance: any, td: any, row: number, col: number, prop: any, value: any, cellProperties: any) {
    Handsontable.default.renderers.TextRenderer(instance, td, row, col, prop, value, cellProperties);
    td.innerHTML = `<div style="display: flex;"><button class="remove">-</button><button class="add" >+</button><div>`;
  }
  
  
  public addRow(row: number) {
    // const newRow = { id: this.generateUniqueId(), data: [] };
    this.wipTableData.splice(row + 1, 0, []);
    this.myTable.getInstance().loadData(this.wipTableData);
  }


  public remove(row: number){
    this.wipTableData.splice(row, 1);
    this.myTable.getInstance().loadData(this.wipTableData);

  }


  generateUniqueId() {
    const uniqueString = Math.random().toString(36).substring(2);
    const currentTime = new Date().getTime();
    return `${uniqueString}-${currentTime}`;

  }

  public reset() {
    this.myTable.updateSettings({
      data:[]
    });
  }
  
  save(){
    debugger;
   console.log(this.wipTableData);
   this.wipTableData.forEach(element => {
    debugger;
      if(element[1].length === 0){
        alert('empty');
      }
   });
  }

}



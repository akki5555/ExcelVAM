import { Component, OnInit } from '@angular/core';
import {  ViewChild } from '@angular/core';
import {
    IgxExcelExporterOptions,
    IgxExcelExporterService,
    IgxGridComponent
} from 'igniteui-angular';

import { EXCEL_DATA, LOCAL_DATA } from './data';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-igniteui-angular',
  templateUrl: './igniteui-angular.component.html',
  styleUrls: ['./igniteui-angular.component.scss']
})
export class IgniteuiAngularComponent {

  @ViewChild('grid1', { read: IgxGridComponent, static: true })
  // public grid1: IgxGridComponent;
  public data;
  public comboData = [
      'Paste data as new records',
      'Paste starting from active cell'
  ];
  public pasteMode = this.comboData[0];

  constructor(private excelExportService: IgxExcelExporterService) {
      this.data = LOCAL_DATA;
  }

  public selectionChange(event: any) {
      this.pasteMode = event.newSelection.value;
  }

  public dataPasted(processedData: any) {
      if (this.pasteMode === 'Paste data as new records') {
          this.addRecords(processedData);
      } else {
          this.updateRecords(processedData);
      }
  }

  public addRecords(processedData: any[]) {
      // const columns = this.grid1.visibleColumns;
      // const pk = this.grid1.primaryKey;
      // for (const curentDataRow of processedData) {
      //     const rowData = {};
      //     for (const col of columns) {
      //         rowData[col.field] = curentDataRow[col.visibleIndex];
      //     }
      //     // generate PK
      //     rowData[pk] =
      //         this.grid1.data.length +
      //         this.grid1.transactions.getAggregatedChanges(false).length +
      //         1;
      //     this.grid1.addRow(rowData);
      // }
      // // scroll to last added row
      // this.grid1.verticalScrollContainer.dataChanged
      //     .pipe(first())
      //     .subscribe(() => {
      //         this.grid1.verticalScrollContainer.scrollTo(
      //             this.grid1.dataView.length - 1
      //         );
      //     });
  }

  public updateRecords(processedData: any[]) {
      // const cell = this.grid1.selectedCells[0];
      // const pk = this.grid1.primaryKey;
      // if (!cell) {
      //     return;
      // }
      // const rowIndex = cell.row.index;
      // // const rowPkValue = cell.row.key;
      // const cellIndex = cell.column.visibleIndex;
      // const columns = this.grid1.visibleColumns;
      // let index = 0;
      // const updatedRecsPK = [];
      // for (const curentDataRow of processedData) {
      //     const rowData = {};
      //     const dataRec = this.grid1.data[rowIndex + index];
      //     const rowPkValue = dataRec
      //         ? dataRec[pk]
      //         : this.grid1.data.length + 1;
      //     rowData[pk] = rowPkValue;
      //     for (let j = 0; j < columns.length; j++) {
      //         let currentCell;
      //         if (j >= cellIndex) {
      //             currentCell = curentDataRow.shift();
      //         }
      //         const colKey = columns[j].field;
      //         rowData[colKey] =
      //             currentCell || (!!dataRec ? dataRec[colKey] : null);
      //     }
      //     if (!dataRec) {
      //         // no rec to update, add instead
      //         rowData[pk] = rowPkValue;
      //         this.grid1.addRow(rowData);
      //         continue;
      //     }
      //     this.grid1.updateRow(rowData, rowPkValue);
      //     this.grid1.cdr.detectChanges();
      //     updatedRecsPK.push(rowPkValue);
      //     index++;
      // }
  }

  public downloadExcel(eventArgs: any) {
      this.excelExportService.exportData(
          EXCEL_DATA,
          new IgxExcelExporterOptions('sample-data')
      );
  }

  public undo() {
      // this.grid1.transactions.undo();
  }

  public redo() {
      // this.grid1.transactions.redo();
      // if (this.pasteMode === 'Paste starting from active cell') {
      //     return;
      // }
      // this.grid1.verticalScrollContainer.dataChanged
      //     .pipe(first())
      //     .subscribe(() => {
      //         this.grid1.verticalScrollContainer.scrollTo(
      //             this.grid1.dataView.length - 1
      //         );
      //     });
  }

  public commit() {
      // this.grid1.transactions.commit(this.data);
  }
  public get undoEnabled(): boolean {
      return true
  }

  public get redoEnabled(): boolean {
      return true
  }

  public get hasTransactions(): boolean {
      return true
  }
}

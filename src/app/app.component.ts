import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DocumentDescriptor, KENDO_SPREADSHEET, SheetDescriptor, SpreadsheetComponent } from '@progress/kendo-angular-spreadsheet';
import { importIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { base64File, base64String, sampleSheet } from './data';
// import { Workbook } from '@progress/kendo-ooxml';
import { saveAs } from '@progress/kendo-file-saver';
import { Workbook } from '@progress/kendo-ooxml';


const base64toBlob = (b64Data: any, contentType = "", sliceSize = 512): Blob => {
  const byteCharacters = atob(b64Data);
  const byteArrays: any = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // imports: [KENDO_SPREADSHEET],
  // standalone: true
})
export class AppComponent implements OnInit, AfterViewInit  {
  title = 'kendo-angular-app';

  public hasSaved: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  //   // Create a new workbook and a worksheet
  //   const workbook = new Workbook();
  //   const sheet = workbook.addSheet('Sheet 1');
    
  //   // Add some sample data
  //   sheet.range('A1').setValue('This is a protected cell');

  //   // Protect the worksheet
  //   sheet.protect({
  //     password: 'password123', // Optional password for protection
  //     selectLockedCells: true, // Allow selection of locked cells (can be customized)
  //   });

  //   this.sheetData = workbook;
  }


  
  public data: SheetDescriptor[] = sampleSheet;
  public importSVG: SVGIcon = importIcon;
  
  public jsonDocData!: DocumentDescriptor;

  public binaryString = atob(base64String);
  public binaryString_2 = atob(base64File);
  // public binaryString_3 = atob(base64File);
  public binaryString_3: any;
  public byteArray: any;
  public byteArray_2: any;
  public byteArray_3: any;

  ngOnInit(): void {
    console.log("data: ", this.data);

    this.byteArray = new Uint8Array(this.binaryString.length);
    for (let i = 0; i < this.binaryString.length; i++) {
      this.byteArray[i] = this.binaryString.charCodeAt(i);
    }
    this.byteArray_2 = new Uint8Array(this.binaryString_2.length);
    for (let i = 0; i < this.binaryString_2.length; i++) {
      this.byteArray_2[i] = this.binaryString_2.charCodeAt(i);
    }
    

    // console.log("byteArray: ", this.byteArray);
  }


  public onImport(spreadsheet: SpreadsheetComponent, src: string): void {
    if(src==='JSON'){
      spreadsheet.spreadsheetWidget.fromJSON({ sheets: this.data });
      const spreadsheetView = this.el.nativeElement.querySelector(
        // '.k-spreadsheet-view'
        'k-spreadsheet-fixed-container'
      );
      if (spreadsheetView) {
        this.renderer.addClass(spreadsheetView, 'k-disabled');
      }
      // spreadsheet.spreadsheetWidget.saveJSON
    }
    if(src==='JSON_SAVE'){
      spreadsheet.spreadsheetWidget.fromJSON({ sheets: this.jsonDocData.sheets });
      // spreadsheet.spreadsheetWidget.saveJSON
    }
    if(src==='base64'){
      const blob: Blob = base64toBlob(base64String);
      spreadsheet.spreadsheetWidget.fromFile(blob);
    }
    if(src==='base64_2'){
      const blob: Blob = base64toBlob(base64File);
      spreadsheet.spreadsheetWidget.fromFile(blob);
    }
    if(src==='base64_SAVE'){
      const blob: Blob = base64toBlob(base64File);
      spreadsheet.spreadsheetWidget.fromFile(blob);
    }
    if(src==='ByteArray'){
      // console.log("this.byteArray: ", this.byteArray);

      const blob = new Blob([this.byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      spreadsheet.spreadsheetWidget.fromFile(blob);
    }
    if(src==='ByteArray_2'){
      console.log("this.byteArray_2: ", this.byteArray_2);

      const blob = new Blob([this.binaryString_3], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      spreadsheet.spreadsheetWidget.fromFile(blob);
    }
    if(src==='ByteArray_SAVE'){
      console.log("this.byteArray_3: ", this.byteArray_3);

      const blob = new Blob([this.byteArray_3], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      spreadsheet.spreadsheetWidget.fromFile(blob);
    }
  }

  public onSave(spreadsheet: SpreadsheetComponent): void {

    console.log("save: ", 
      spreadsheet.spreadsheetWidget.saveAsExcel({saveAs, Workbook})
    );
    

    spreadsheet.spreadsheetWidget.saveJSON().then((data) => {
      this.jsonDocData = data;
      this.hasSaved = true;


      // Convert the JSON object to a string
      const jsonString = JSON.stringify(this.jsonDocData);
      console.log("jsonString: ", jsonString);
      

      // // Convert the JSON string to a byte array using TextEncoder
      // // const encoder = new TextEncoder();
      // // const byteArray = encoder.encode(jsonString);
      // const base64String = btoa(jsonString);
      // this.binaryString_3 = base64String;
      // this.byteArray_3 = new Uint8Array(base64String.length);
      // for (let i = 0; i < base64String.length; i++) {
      //   this.byteArray_3[i] = base64String.charCodeAt(i);
      // }

      // console.log("base64String: ", base64String);
      
      // // this.byteArray_3 = byteArray;
      // console.log("this.byteArray_2: ", this.byteArray_2);
      // console.log("this.byteArray_3: ", this.byteArray_3);
      
    });
  }

  activeSheetChange(event:any){
    console.log("event: ", event);
  }
  change(event:any){
    console.log("event: ", event);
    event.preventDefault()
  }

  ngAfterViewInit(): void {
    const spreadsheetView = this.el.nativeElement.querySelector(
      // '.k-spreadsheet-view'
      'k-spreadsheet-fixed-container'
    );
    if (spreadsheetView) {
      this.renderer.addClass(spreadsheetView, 'k-disabled');
    }
  }

}

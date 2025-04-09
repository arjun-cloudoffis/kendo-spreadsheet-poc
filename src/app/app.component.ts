import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DocumentDescriptor, KENDO_SPREADSHEET, SheetDescriptor, SpreadsheetComponent } from '@progress/kendo-angular-spreadsheet';
import { importIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { base64File, base64String, sampleSheet } from './data';
// import { Workbook } from '@progress/kendo-ooxml';
import { saveAs } from '@progress/kendo-file-saver';
import { Workbook } from '@progress/kendo-ooxml';
import { Papa } from 'ngx-papaparse';
import { csvData, csvData_20250319223134, csvData_20250319223508 } from './csv_byte_array';

// import Papa from 'papaparse';



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


interface Cell {
  value: string;
  color: string;
  index: number;
}

interface Row {
  index: number;
  cells: Cell[];
}

const data1 = [
	{
		"[Client] Client": "Aaron wings",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Not for Profit",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "ABS Pvt.Ltd",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Individual",
		"[Client] Address": "45 Steel St ",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "Acer",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "85 655 468 876",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Acer Champions",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "85 655 468 876",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Prashant  Shah"
	},
	{
		"[Client] Client": "alex",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "85 655 468 876",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Alex",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "85 655 468 876",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Alex",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "85 655 468 876",
		"[Client] Business Structure": "Estate",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Alex Taubman",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "37 282 969 452",
		"[Client] Business Structure": "Sole Trader",
		"[Client] Address": "641-913 Steele Rd ",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Parakramsinh Parmar"
	},
	{
		"[Client] Client": "Alica ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Unit Trust",
		"[Client] Address": "795 Strettle Rd ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "American Trust",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Individual",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "American Trust Edited New",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Individual",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Aron HT.",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "58 702 582 891",
		"[Client] Business Structure": "Company",
		"[Client] Address": "45 Screen St ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Parakramsinh Parmar"
	},
	{
		"[Client] Client": "Ascend Financial",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Ashley W. ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "private funds",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Awesome Accounting ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Bethany Hassell",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Bhumit Test",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Bruce Lee ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "70 124 588 561",
		"[Client] Business Structure": "Individual",
		"[Client] Address": "sfff",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "Bruce Wayne Pty Ltd",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Sole Trader",
		"[Client] Address": "96 Coleraine Rd ",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Parakramsinh Parmar"
	},
	{
		"[Client] Client": "Carol R. Morgan",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "66 712 931 973",
		"[Client] Business Structure": "Company",
		"[Client] Address": "19 Steetley Lane E ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Prashant  Shah"
	},
	{
		"[Client] Client": "Catalyst Financial Solutions",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Charli Reilly",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "Clarity Accounting & Consulting",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Cloudoffis Club",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "Co $ Co company",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Partnership",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Daniel Prenzel",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Individual",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "David $ David",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Divy Modi ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Individual",
		"[Client] Address": "",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Eliza ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "61 779 388 676",
		"[Client] Business Structure": "Individual",
		"[Client] Address": "159 Rode Rd ",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "Emily Eales",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Public funds",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Emily Garrard",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Endorson pvt ltd",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Sole Trader",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Parakramsinh Parmar"
	},
	{
		"[Client] Client": "Eric A",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Eve Phillip",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "99 495 452 829",
		"[Client] Business Structure": "entertainment companies",
		"[Client] Address": "236-256 Melbourne St ",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "Evie Joseph 1",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "58 702 582 891",
		"[Client] Business Structure": "entertainment companies",
		"[Client] Address": "56 High Street Rd ",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "Evolve Accounting",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Flynn Gell",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Other",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Foresight Accounting",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Harrison Lawes",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "CE Custom tech ",
		"[Client] Address": "52 Cadell Rd ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "Jai Cairns",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Holding ",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Jake Hays",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "James L. Johnson",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Jignesh",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Jasmine Handfield",
		"[Client] First Name": "test 1",
		"[Client] Last Name": "test 2",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Holding Company of trust Australia zone Holding Company of trust Australia zone Holding Company of",
		"[Client] Address": "139-169 Potassium St ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Jeremy Derrington",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Club or Society",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Jesse ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "private funds",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Jet Pvt Ltd",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "132 Stewarts Rd ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Jett Longmore",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "23 614 069 859",
		"[Client] Business Structure": "Company",
		"[Client] Address": "133 Streeton Dr ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Jhonson Family Trust",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "85 655 468 876",
		"[Client] Business Structure": "Sole Trader",
		"[Client] Address": "27 Georgette St ",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "John Snow Pty Ltd",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Partnership",
		"[Client] Address": "192 Sterling Dr ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Prashant  Shah"
	},
	{
		"[Client] Client": "Jones.",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "73 516 095 794",
		"[Client] Business Structure": "Company",
		"[Client] Address": "126 Oxley Station Rd ",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Prashant  Shah"
	},
	{
		"[Client] Client": "Justin Dorsch",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "58 702 582 891",
		"[Client] Business Structure": "CE Custom tech ",
		"[Client] Address": "2 Cole Ct ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Kate ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "27 655 744 335",
		"[Client] Business Structure": "Company",
		"[Client] Address": "54 Copernicus Rd ",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "Katie ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "CE Custom tech ",
		"[Client] Address": "23 Cade Way ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Kayla Dadswell",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Superannuation Fund",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Krupa ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Krupa Test ",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "M. Mathews",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "entertainment companies",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Marvel",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "Las Vegas ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "McCraw",
		"[Client] First Name": "Test ",
		"[Client] Last Name": "Modi",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Individual",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Prashant  Shah"
	},
	{
		"[Client] Client": "Michael J. Glassman",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Tax Sorted Demo",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Milla Heath",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "58 Coleman Rd ",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Parakramsinh Parmar"
	},
	{
		"[Client] Client": "MiracleGroup",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "Mitchell Bryant",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Sole Trader",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Modi ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Modi",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Modi & Partners ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Partnership",
		"[Client] Address": "12 Madora Beach Rd ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Momentum Accounting",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "NavPoint Financial",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Oliver grey",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "CE Custom tech ",
		"[Client] Address": "",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Prashant  Shah"
	},
	{
		"[Client] Client": "Olivia Dooley",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "27 655 744 335",
		"[Client] Business Structure": "Company",
		"[Client] Address": "96 Coogee Bay Rd ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Parakramsinh Parmar"
	},
	{
		"[Client] Client": "Patrick Entertain company",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "entertainment companies",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Percy S. Honaker",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "PS",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "private funds",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "PS Technologies Pty LTD",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "90 600 590 038",
		"[Client] Business Structure": "Partnership",
		"[Client] Address": "17 Streeters Rd ",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Pualo Alto ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Unit Trust",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "Quantum Financial",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Partnership",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Rebecca Hook",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Rebecca Swayne",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "82 366 993 541",
		"[Client] Business Structure": "Government Entity",
		"[Client] Address": "Mount 123 Paramatta",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Parakramsinh Parmar"
	},
	{
		"[Client] Client": "Richard B. Rivers",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "July Test",
		"[Client] Address": "45 Carawa Rd ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "S. Holland",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "CE Custom tech ",
		"[Client] Address": "Atladara ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Sachin Pty Ltd",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Sam charis",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Other",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Prashant  Shah"
	},
	{
		"[Client] Client": "Seth Hort",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "private funds",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Sharon J",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Trust",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Sofia Oakley",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "65 193 169 138",
		"[Client] Business Structure": "Sole Trader",
		"[Client] Address": "sfff",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Prashant  Shah"
	},
	{
		"[Client] Client": "Softech info.",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Holding Company of Trust",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "STARK ADVISORY PTY LTD",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "Level 3 15 Bourke Rd ",
		"[Client] Tax Agent": "Prashant Shah",
		"[Client] Account Manager": "Prashant  Shah"
	},
	{
		"[Client] Client": "stark solution",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Tax Sorted Demo",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Streamline Financial",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Sole Trader",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Susan C. Brett",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Sydney Strikers LLP",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Thomas co.",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "CE Custom tech ",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Tony Traders ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "23 Steere Cres ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Tyler Annand",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Self Managed Superannuation Fund",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Tyler B. ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Self Managed Superannuation Fund",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Unit Company ",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Trust",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Divy Divy Divy ModiModiModiModi"
	},
	{
		"[Client] Client": "Veracity Financial",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Company",
		"[Client] Address": "",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	},
	{
		"[Client] Client": "Wayne Enterprises Pvt.Ltd",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "Individual",
		"[Client] Address": "89 Streeton Dr ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": "Prashant  Shah"
	},
	{
		"[Client] Client": "XYZ Pty Ltd test",
		"[Client] First Name": "",
		"[Client] Last Name": "",
		"[Client] Business Number": "",
		"[Client] Business Structure": "CE Custom tech ",
		"[Client] Address": "Test new ",
		"[Client] Tax Agent": "",
		"[Client] Account Manager": ""
	}
];

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

  // exampleCell: Cell = {
  //   value: 'cocococococ'
  // }

  @ViewChild(SpreadsheetComponent) public spreadsheet!: SpreadsheetComponent;

  constructor(private el: ElementRef, private renderer: Renderer2, private papa: Papa) {
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

// console.log(this.convertArrayToKendoRows(data1))
console.log(this.convertToKendoExportable(data1))



    // setTimeout(() => {
      
    //   this.spreadsheet.change
    // }, 5000);

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

    if(src==='ByteArray_CSV'){
      const parsed = this.papa.parse(csvData, {
        skipEmptyLines: true
      });
      console.log(parsed.data);
    }
    if(src==='CSV'){
      
      spreadsheet.spreadsheetWidget.fromJSON({ sheets: this.convertToKendoExportable(data1) });

    }
    if(src==='ByteArray_CSV_20250319223134'){
      const parsed = this.papa.parse(csvData_20250319223134, {
        skipEmptyLines: true
      });
      spreadsheet.spreadsheetWidget.fromJSON({ sheets: this.convertToKendoExportable(parsed.data) });
      // spreadsheet.spreadsheetWidget.fromJSON({ sheets: this.convertToKendoExportable(data1) });

    }
    if(src==='ByteArray_CSV_20250319223508'){
      const parsed = this.papa.parse(csvData_20250319223508, {
        skipEmptyLines: true
      });
      spreadsheet.spreadsheetWidget.fromJSON({ sheets: this.convertToKendoExportable(parsed.data) });
      // spreadsheet.spreadsheetWidget.fromJSON({ sheets: this.convertToKendoExportable(data1) });

    }
    if(src==='JSON'){
      spreadsheet.spreadsheetWidget.fromJSON({ sheets: this.data });
      // console.log("this.el.nativeElement: ", this.el.nativeElement.querySelector(''));
      
      // const spreadsheetView = this.el.nativeElement.querySelector('.k-spreadsheet-fixed-container');
      // // '.k-spreadsheet-view'
      // console.log("spreadsheetView: ", spreadsheetView);
      
      // if (spreadsheetView) {
      //   this.renderer.addClass(spreadsheetView, 'k-disabled');
      // }
      // // spreadsheet.spreadsheetWidget.saveJSON
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

      console.log("decode: ", new TextDecoder().decode(this.byteArray_2));
      

      const blob = new Blob([this.byteArray_2], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      spreadsheet.spreadsheetWidget.fromFile(blob);
    }
    if(src==='ByteArray_SAVE'){
      console.log("this.byteArray_3: ", this.byteArray_3);

      const blob = new Blob([this.byteArray_3], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      spreadsheet.spreadsheetWidget.fromFile(blob);
    }
  }

  jsonToByteArray(json: any): Uint8Array {
    const jsonString = JSON.stringify(json); // Convert the JSON object to a string
    const encoder = new TextEncoder();        // Create a TextEncoder instance
    return encoder.encode(jsonString);       // Convert the string to a Uint8Array
  }

  public onSave(spreadsheet: SpreadsheetComponent): void {

    // console.log("save: ", 
    //   spreadsheet.spreadsheetWidget.saveAsExcel({saveAs, Workbook})
    // );
    

    spreadsheet.spreadsheetWidget.saveJSON().then((data) => {
      console.log("data: ", data);
      
      this.jsonDocData = data;
      this.hasSaved = true;


      // Convert the JSON object to a string
      const jsonString = JSON.stringify(this.jsonDocData);
      console.log("jsonString: ", jsonString);

      // console.log('json to bA: ', this.jsonToByteArray(this.jsonDocData));

      
      
      this.byteArray_3 = this.jsonToByteArray(this.jsonDocData.sheets);
      // Format the byte array as a comma-separated string:
      const byteValues = Array.from(this.byteArray_3); // Convert to a regular array
      const byteString = byteValues.join(", ");
      console.log("Byte array (comma-separated):", byteString);
    
      const decoder = new TextDecoder();
      const jsonString_1 = decoder.decode(this.byteArray_3);



      console.log("jsonString_1: ", JSON.parse(jsonString_1));
      console.log("this.byteArray_3: ", this.byteArray_3);
      
      
      console.log('same saved json',new TextDecoder().decode(this.byteArray_3)); // Logs the decoded JSON string


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

  edit(spreadSheet: SpreadsheetComponent){
    // spreadSheet.
    // this.spreadsheet.activeSheetChange.
    // this.spreadsheet.activeSheet().range

    setTimeout(() => {
      
      const change = new this.spreadsheet.change()
      console.log("chenged!!!", change);

      // this.spreadsheet
      
    }, 5000);

    
    
  }

  activeSheetChange(event:any){
    console.log("event: ", event);
  }
  change(event:any){
    console.log("event: ", event);
    event.preventDefault()
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        console.log('Byte array:', byteArray);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  // onFileChange(event:any){
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.convertCsvToJson(file);
  //   }

  // }




   // Function to convert CSV file to JSON
   convertCsvToJson(file: File): void {
    this.papa.parse(file, {
      complete: (result:any) => {
        console.log('Parsed CSV Result:', result);
        const jsonData = result.data; // This is the JSON representation
        this.handleJsonData(jsonData);
      },
      header: true, // This tells PapaParse to treat the first row as headers
      skipEmptyLines: true, // Skip empty lines
    });
  }

  // Function to handle JSON data after conversion
  handleJsonData(jsonData: any): void {
    console.log('Converted JSON:', jsonData);
    // Do something with the JSON data (e.g., display it, store it, etc.)
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



  convertArrayToKendoRows(dataArray: Record<string, string>[]): Row[] {
    const allKeys = Array.from(
      new Set(dataArray.flatMap(obj => Object.keys(obj)))
    );

    console.log("allKeys: ", allKeys);
    
  
    const headerRow: Row = {
      index: 0,
      cells: allKeys.map((key, idx) => ({
        value: key,
        color: "#000000",
        index: idx
      }))
    };
  
    const valueRows: Row[] = dataArray.map((dataObj, rowIdx) => {
      const cells: Cell[] = allKeys.map((key, colIdx) => {
        const val = dataObj[key];
        return val !== "" && val !== undefined
          ? { value: val, color: "#000000", index: colIdx }
          : null;
      }).filter((cell): cell is Cell => cell !== null);
  
      return {
        index: rowIdx,
        cells
      };
    });
  
    console.log([...valueRows]);
    
    return [...valueRows];
  }

  convertToKendoExportable(dataArray:any) {
    const kendoAcceptableFormat : SheetDescriptor[] = [
      {
        		"name": "",
        		// "state": "visible",
        		"rows": this.convertArrayToKendoRows(dataArray),
        		"columns": [],
        		// "selection": "A1:A1",
        		// "activeCell": "A1:A1",
        		// "frozenRows": 0,
        		// "frozenColumns": 0,
        		// "showGridLines": true,
        		// "gridLinesColor": null,
        		// "mergedCells": [],
        		// "hyperlinks": [],
        		// "defaultCellStyle": {
        		// 	"fontFamily": "Arial",
        		// 	"fontSize": 12
        		// },
        		// "drawings": []
        	}
    ]
    console.log(kendoAcceptableFormat);
    return kendoAcceptableFormat;
  }

}

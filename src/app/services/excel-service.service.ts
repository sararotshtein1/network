import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelServiceService {
  constructor(private httpService: HttpClient) {}

  readFileNetwork() {
    // this.load();
    // this.httpService
    //   .get('assets/network.xlsx', { responseType: 'blob' })
    //   .subscribe((data: any) => {
    //     console.log(data);
    //     const dd = <any[]>this.importFromFile(data);
        //     const reader: FileReader = new FileReader();

        //     let dataJson1;
        //     let dataJson2;

        //     reader.onload = (e: any) => {
        //       const bstr: string = e.target.result;
        //       const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        //       /* grab first sheet */
        //       console.log('ssd', wb.SheetNames);
        //       const wsname1: string = wb.SheetNames[1];
        //       const ws1: XLSX.WorkSheet = wb.Sheets[wsname1];

        //       /* grab second sheet */
        //       const wsname2: string = wb.SheetNames[2];
        //       const ws2: XLSX.WorkSheet = wb.Sheets[wsname2];

        //       /* save data */
        //       dataJson1 = XLSX.utils.sheet_to_json(ws1);
        //       dataJson2 = XLSX.utils.sheet_to_json(ws2);
        //       console.log(dataJson1);
        //     };
        //     reader.readAsBinaryString(data);
        //     console.log(data);
   //   });

    //     this.httpService
    //       .get('assets/network.xlsx', { responseType: 'blob' })
    //       .subscribe(
    //         (data) => {
    //           const reader: FileReader = new FileReader();
    //           reader.onload = (e: any) => {
    //               console.log("READ " + e);
    //             };
    // reader.readAsBinaryString(data);
    //           console.log(data);
    //         },
    //         (error) => {
    //           //console.log('errorr', error);
    //         }
    //       );
  }

  public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = <XLSX.AOA2SheetOpts>(
      XLSX.utils.sheet_to_json(ws, { header: 1 })
    );

    return data;
  }

  load() {
    var url = 'assets/network.xlsx';
    var oReq = new XMLHttpRequest();
    oReq.open('GET', url, true);
    oReq.responseType = 'arraybuffer';

    oReq.onload = function (e) {
      var arraybuffer = oReq.response;
      console.log(arraybuffer);

      /* convert data to binary string */
      var data = new Uint8Array(arraybuffer);
      console.log(data);

      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');

      /* Call XLSX */
      var workbook = XLSX.read(bstr, { type: 'binary' });
      console.log(workbook);

      /* DO SOMETHING WITH workbook HERE */
      var first_sheet_name = workbook.SheetNames[0];
      console.log(first_sheet_name);

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      let x = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(x);
    };

    oReq.send();
  }
}

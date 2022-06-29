import { Component, VERSION } from '@angular/core';
import { ExcelServiceService } from './services/excel-service.service';
import * as XLSX from 'xlsx';
import { Nodes } from './models/nodes';
import { Edges } from './models/edges';
import { Edge, Node } from '@swimlane/ngx-graph';

type AOA = any[][];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data: AOA;
  dataJsonNodes:Node[]=[];
  notDupplicateValue:Array<Edge> = new Array<Edge>()
  showGraph:boolean=false

  constructor(private excelService: ExcelServiceService) {

    // this.excelService.readFileNetwork();
  }

  onFileChange(evt: any) {
    var graph = new graph();
    graph.addNode('bar', { key: 'value'});
    graph.addNode('foo', { key: 'value1'});

    graph.addEdge('foo', 'bar');
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      console.log('dataJson1', 'fd');

      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* grab second sheet */
      const wsname2: string = wb.SheetNames[1];
      const ws2: XLSX.WorkSheet = wb.Sheets[wsname2];
      console.log('dataJson1', 'fd');

      this.dataJsonNodes = XLSX.utils.sheet_to_json<Node>(ws);
      console.log('dataJson1', this.dataJsonNodes[0]);
      let dataJsonEdges = XLSX.utils.sheet_to_json<Edge>(ws2);
      console.log('dataJson2', dataJsonEdges[0]);

      /* get array duplicate and num repeat in array- question 1 */
      let counter = {};
      dataJsonEdges.forEach(function (obj) {
        var key = JSON.stringify(obj);
        counter[key] = (counter[key] || 0) + 1;
      });
      


      let onlyDupplicateValue = new Array<Edge>();
      // let notDupplicateValue = new Array<Edge>();
      let numberEdges = 0;
      for (var element in counter) {
        numberEdges++;
        let edge = JSON.parse(element);
        edge.Id=numberEdges
        //edge.NumberItems = counter[element];
        this.notDupplicateValue.push(edge);
        if (counter[element] > 1) onlyDupplicateValue.push(edge);
      }
      console.log('dupplicateValue one to exemple:', onlyDupplicateValue[0]);
      this.showGraph=true
      /* get number nodes- question 2*/

      console.log('nodes', this.dataJsonNodes.length); ///1
      console.log('edges', numberEdges); ////2

      let avg = this.findDarga(this.notDupplicateValue, 'source'); ////3
      console.log('Avg. Dergee', avg);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  findDarga(arr, key): number {
    let arr2 = [];
    arr.forEach((x) => {
      if (
        arr2.some((val) => {
          return val[key] == x[key];
        })
      ) {
        arr2.forEach((k) => {
          if (k[key] === x[key]) {
            k['occurrence']++;
          }
        });
      } else {
        // If not! Then create a new object initialize
        // it with the present iteration key's value and
        // set the occurrence to 1
        let a = {};
        a[key] = x[key];
        a['occurrence'] = 1;
        arr2.push(a);
      }
    });

    let sum = 0;
    arr2.forEach((x) => {
      sum += x['occurrence'];
    });
    console.log('sum', sum);
    return sum / arr2.length;
  }
}

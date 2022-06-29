import { Component, VERSION } from '@angular/core';
import { ExcelServiceService } from './services/excel-service.service';
import * as XLSX from 'xlsx';
import { Nodes } from './models/nodes';
import { Edges } from './models/edges';
import { Graph } from './models/graph';

type AOA = any[][];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data: AOA;
  dataJsonNodes:Nodes[]=[];
  dataJsonEdges:Edges[]=[];
  notDupplicateValue:Array<Edges> = new Array<Edges>()
  graph:Graph

  constructor(private excelService: ExcelServiceService) {
   
let g=new Graph(4);
    // g.printGraph();
   // this.excelService.readFileNetwork();
  }

  onFileChange(evt: any) {
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

      this.dataJsonNodes = XLSX.utils.sheet_to_json<Nodes>(ws);
      console.log('dataJson1', this.dataJsonNodes[0]);
      this.dataJsonEdges = XLSX.utils.sheet_to_json<Edges>(ws2);
      console.log('dataJson2', this.dataJsonEdges[0]);

      /* get array duplicate and num repeat in array- question 1 */
      this.getArrayNotDupplicate();

       
     
      /* get number nodes- question 2*/
      let numNodes=this.dataJsonNodes.length
      let numEdges=this.notDupplicateValue.length
      console.log('nodes',numNodes ); ///1
      console.log('edges', numEdges); ////2
     const evg=numEdges /numNodes
    //  let avg = this.findDarga(this.notDupplicateValue, 'source'); ////3
      console.log('Avg. Dergee',evg ); //3

      this.buildGraph()
    };
    reader.readAsBinaryString(target.files[0]);
  }


  getArrayNotDupplicate():void{
         /* get array duplicate and num repeat in array- question 1 */
      let counter = {};
      this.dataJsonEdges.forEach(function (obj) {
        var key = JSON.stringify(obj);
        counter[key] = (counter[key] || 0) + 1;
      });

      let onlyDupplicateValue = new Array<Edges>();
      // let notDupplicateValue = new Array<Edge>();
      for (var element in counter) {
        let edge = JSON.parse(element);
        edge.NumberItems = counter[element];
        this.notDupplicateValue.push(edge);
        //weight
        if (counter[element] > 1){
          onlyDupplicateValue.push(edge);
        } 
      }
      console.log('dupplicateValue one to exemple:', onlyDupplicateValue[0]);
  }

  buildGraph():void{
     //build graph
     console.log("graph")
     this.graph = new Graph(this.dataJsonNodes.length);
     // adding vertices
     this.dataJsonNodes.forEach((x) => {
       this.graph.addVertex(x.Id)
     })
    // this.graph.cc()
    
     this.notDupplicateValue.forEach((x) => {
      this.graph.addEdge(x.Source,x.Target)
    })
    this.graph.getEdgDarga();
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

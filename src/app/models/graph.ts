import { Edges } from "./edges";
import { Nodes } from "./nodes";

export class Graph {
  noOfVertices:number;
  AdjList:Map<Nodes,Edges[]>;
  constructor(noOfVertices)
    {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }

    addVertex(v)
{
    // initialize the adjacent list with a
    // null array
    this.AdjList.set(v, []);
}

addEdge(v, w)
{
    // get the list for vertex v and put the
    // vertex w denoting edge between v and w
    this.AdjList.get(v).push(w);
 
    // Since graph is undirected,
    // add an edge from w to v also
    this.AdjList.get(w).push(v);
}


printGraph()
{
    // get all the vertices
    var get_keys = this.AdjList.keys();
 
    // iterate over the vertices
    for (var i of get_keys)
{
        // great the corresponding adjacency list
        // for the vertex
        var get_values = this.AdjList.get(i);
        var conc = "";
 
        // iterate over the adjacency list
        // concatenate the values into a string
        for (var j of get_values)
            conc += j + " ";
 
        // print the vertex and its adjacency list
        console.log(i + " -> " + conc);
    }
}

getEdgDarga()
{
    // get all the vertices
    var get_keys = this.AdjList.keys();
    let count=0;
    let sum=0;
 
    // iterate over the vertices
    for (var i of get_keys)
{
  count++;
  sum+=this.AdjList.get(i).length
        // great the corresponding adjacency list
        // for the vertex
        // var get_values = this.AdjList.get(i);
 
        // // iterate over the adjacency list
        // // concatenate the values into a string
        // for (var j of get_values)
          //  conc += j + " ";
 
        // print the vertex and its adjacency list
        console.log(count + " -> " + sum);
        console.log(sum/count);
    }
}


}
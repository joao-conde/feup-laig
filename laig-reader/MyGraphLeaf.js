/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph,xmlelem,type,args) {
  this.graph = graph;
  this.id = xmlelem;
  this.primitive = type;
  this.vertexes = args;
}

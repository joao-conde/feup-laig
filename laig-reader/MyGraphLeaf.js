/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/


/*
function MyGraphLeaf(graph,xmlelem,type,args) {
  this.graph = graph;
  this.id = xmlelem;
  this.primitive = type;
  this.vertexes = args;
}
*/

function MyGraphLeaf(graph, xmlelem) {

	this.graph = graph;
	this.type = this.graph.reader.getItem(xmlelem, 'type', ['rectangle', 'cylinder', 'sphere', 'triangle']);
	this.args = this.graph.reader.getString(xmlelem, 'args').split(" ");
	this.primitive = null;


	if(this.type == "rectangle") {

		this.primitive = new MyRectangle(this.graph.scene,
			parseInt(this.args[0]),
			parseInt(this.args[1]),
			parseInt(this.args[2]),
			parseInt(this.args[3])
			);

	}

	else if(this.type == "triangle") {

		this.primitive = new MyTriangle(this.graph.scene,
			parseInt(this.args[0]),
			parseInt(this.args[1]),
			parseInt(this.args[2]),
			parseInt(this.args[3]),
			parseInt(this.args[4]),
			parseInt(this.args[5]),
			parseInt(this.args[6]),
			parseInt(this.args[7]),
			parseInt(this.args[8]));
	}

	else if(this.type == "cylinder") {

		this.primitive = new MyVersatileCylinder(this.graph.scene,
			parseInt(this.args[0]),
			parseInt(this.args[1]),
			parseInt(this.args[2]),
			parseInt(this.args[3]),
			parseInt(this.args[4]));

	}

	else if(this.type == "sphere") {

		this.primitive = new MyWholeSphere(this.graph.scene,
			
			parseInt(this.args[0]),
			parseInt(this.args[1]),
			parseInt(this.args[2]));

	}

}

MyGraphLeaf.prototype.constructor = MyGraphLeaf;
MyGraphLeaf.prototype = Object.create(MyGraphLeaf.prototype);


MyGraphLeaf.prototype.display = function() {

	if(this.primitive != null) {

		this.graph.scene.pushMatrix();
		this.primitive.display();
		this.graph.scene.popMatrix();

	}

}

/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem, controlVertexes) {

	this.graph = graph;
	this.type = this.graph.reader.getItem(xmlelem, 'type', ['rectangle', 'cylinder', 'sphere', 'triangle', 'patch']);
	this.args = this.graph.reader.getString(xmlelem, 'args').split(" ");
	this.primitive = null;

	this.controlVertexes = controlVertexes;


	if(this.type == "rectangle") {

		this.primitive = new MyRectangle(this.graph.scene,
			parseInt(this.args[0]),
			parseInt(this.args[1]),
			parseInt(this.args[2]),
			parseInt(this.args[3]));

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
			parseInt(this.args[4]),
			parseInt(this.args[5]),
			parseInt(this.args[6]));

	}

	else if(this.type == "sphere") {

		this.primitive = new MyWholeSphere(this.graph.scene,
			
			parseInt(this.args[0]),
			parseInt(this.args[1]),
			parseInt(this.args[2]));

	}

	else if(this.type == "patch") {

		
		this.primitive = new MyPatch(this.graph.scene,
			
			this.controlVertexes,
			parseInt(this.args[0]),
			parseInt(this.args[1]));
			

	}

}

MyGraphLeaf.prototype.constructor = MyGraphLeaf;
MyGraphLeaf.prototype = Object.create(MyGraphLeaf.prototype);

MyGraphLeaf.prototype.setScaleFactor = function(afs, aft) {

	if(this.type == "rectangle" || this.type == "triangle") {
		this.primitive.setScaleFactor(afs,aft);
	}

}


MyGraphLeaf.prototype.display = function() {

	if(this.primitive != null) {

		this.graph.scene.pushMatrix();
		this.primitive.display();
		this.graph.scene.popMatrix();

	}

}

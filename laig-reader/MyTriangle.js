/**
 * MyTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
	CGFobject.call(this,scene);

	this.x1 = x1;
	this.y1 = y1;
	this.z1 = z1
	this.x2 = x2;
	this.y2 = y2;
	this.z2 = z2;
	this.x3 = x3;
	this.y3 = y3;
	this.z3 = z3;

	var distance = function(ox,oy,oz,dx,dy,dz) {

		return Math.sqrt(Math.pow((ox-dx),2) + Math.pow((oy-dy),2) + Math.pow((oz-dz),2));

	}

	this.distance_1_3 = distance(this.x1,this.y1,this.z1,this.x3,this.y3,this.z3);
	this.distance_1_2 = distance(this.x1,this.y1,this.z1,this.x2,this.y2,this.z2);
	this.distance_2_3 = distance(this.x2,this.y2,this.z2,this.x3,this.y3,this.z3);

	this.cos_beta = (-Math.pow(this.distance_2_3,2) + Math.pow(this.distance_1_3,2) + Math.pow(this.distance_1_2,2)) / (2 * this.distance_1_3 * this.distance_1_2) 
	this.sin_beta = Math.sin(Math.acos(this.cos_beta));

	this.initBuffers();

};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor=MyTriangle;

MyTriangle.prototype.initBuffers = function () {
	
	this.vertices = [
		
		this.x1, this.y1, this.z1,
		this.x2, this.y2, this.z2,
		this.x3, this.y3, this.z3
	
	];

	this.indices = [
		
		0, 1, 2,
		2, 1, 0
	
	];

	this.primitiveType=this.scene.gl.TRIANGLES;

	this.normals = [
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
	];

	
	
	this.texCoords = [


	    0, this.y1,
	    this.distance_1_2, this.y2,
	    this.distance_1_2 - this.distance_2_3 * this.cos_beta, this.y1 - this.distance_2_3 * this.sin_beta

  	];


	this.initGLBuffers();

};

MyTriangle.prototype.setScaleFactor = function(afs, aft) {


	
	this.texCoords = [

	    0, this.y1/aft,
	    this.distance_1_2/afs, this.y2/aft,
	    (this.distance_1_2 - this.distance_2_3 * this.cos_beta)/afs, (this.y1 - this.distance_2_3 * this.sin_beta)/aft

  	];


	this.updateTexCoordsGLBuffers();

}



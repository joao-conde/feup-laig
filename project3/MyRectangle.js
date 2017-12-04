/**
 * MyRectangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyRectangle(scene, leftTopX, leftTopY, rightBottomX, rightBottomY) {
	CGFobject.call(this,scene);

	this.leftTopX = leftTopX;
	this.leftTopY = leftTopY;

	this.leftBottomX = leftTopX;
	this.leftBottomY = rightBottomY;
	
	this.rightBottomX = rightBottomX;
	this.rightBottomY = rightBottomY;

	this.rightTopX = rightBottomX;
	this.rightTopY = leftTopY;

	this.minS = 0;
	this.maxS = Math.sqrt(Math.pow((this.leftBottomX - this.rightBottomX),2) + Math.pow((this.leftBottomY - this.rightBottomY),2));
	this.minT = 0;
	this.maxT = Math.sqrt(Math.pow((this.leftTopX - this.leftBottomX),2) + Math.pow((this.leftTopY - this.leftBottomY),2));

	this.initBuffers();


};

 MyRectangle.prototype = Object.create(CGFobject.prototype); 
 MyRectangle.prototype.constructor = MyRectangle;
 
 MyRectangle.prototype.initBuffers = function () {
	this.vertices = [
            
            this.leftBottomX, this.leftBottomY, 0,
            this.rightBottomX, this.rightBottomY, 0,
            this.rightTopX, this.rightTopY, 0,
            this.leftTopX, this.leftTopY, 0
			];

	this.indices = [
		0, 1, 2,
		2, 3, 0
	];


	this.primitiveType=this.scene.gl.TRIANGLES;

	this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
	];


	this.texCoords = [

		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.maxS, this.minT,
		this.minS, this.minT

	];

	this.initGLBuffers();
};

MyRectangle.prototype.setScaleFactor = function(afs, aft) {

	this.texCoords = [

		this.minS/afs, this.maxT/aft,
		this.maxS/afs, this.maxT/aft,
		this.maxS/afs, this.minT/aft,
		this.minS/afs, this.minT/aft

	];

	this.updateTexCoordsGLBuffers();

}
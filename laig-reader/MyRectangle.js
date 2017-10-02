/**
 * MyRectangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyRectangle(scene, leftTopX, leftTopY, rightBottomX, rightBottomY) {
	CGFobject.call(this,scene);

	this.minS = 0;
	this.maxS = 1;
	this.minT = 0;
	this.maxT = 1;

	this.leftTopX = leftTopX;
	this.leftTopY = leftTopY;

	this.leftBottomX = leftTopX;
	this.leftBottomY = rightBottomY;
	
	this.rightBottomX = rightBottomX;
	this.rightBottomY = rightBottomY;

	this.rightTopX = rightBottomX;
	this.rightTopY = leftTopY;




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
		this.minS, this.minT,
		this.maxS, this.minT

	];

	this.initGLBuffers();
};
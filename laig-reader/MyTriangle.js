/**
 * MyTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
	CGFobject.call(this,scene);

	this.vertices = [
		x1, y1, z1,
		x2, y2, z2,
		x3, y3, z3
		]


	this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor=MyTriangle;

MyTriangle.prototype.initBuffers = function () {
	
	/*
	this.vertices = [
            0.5, 0.3, 0,
            -0.5, 0.3, 0,
            0, 0.3, 2
			];
	*/

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

    0, 1,
    0, 0,
    1, 0.5

  ];

	this.initGLBuffers();
};

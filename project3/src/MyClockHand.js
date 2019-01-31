/**
 *
 * @constructor
 */
 function MyClockHand(scene, height, width) {
 	CGFobject.call(this,scene);

  this.height = height;
  this.width = width;

 	this.initBuffers();
 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

 MyClockHand.prototype.setAngle = function(angle) {

   this.scene.rotate(-angle * Math.PI / 180, 0, 0, 1);

 }

 MyClockHand.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

	this.vertices = [];
	this.normals = [];
	this.indices = [];

  this.vertices.push(this.width/2,0,0);
  this.vertices.push(0,this.height,0);
  this.vertices.push(-(this.width/2),0,0);


  this.texCoords = [ /*TODO*/
    0, 1,
    1, 0.5,
    0, 0
  ];


  this.normals.push(0,0,1);
  this.normals.push(0,0,1);
  this.normals.push(0,0,1);

  this.indices.push(0,1,2);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

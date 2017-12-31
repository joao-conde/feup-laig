/**
 * MyDisc
 * @constructor
 */
 function MyDisc(scene) {
 	CGFobject.call(this,scene);

	this.slices = 32;
	this.angle = 2*Math.PI*1.0/this.slices;

 	this.initBuffers();
 };

 MyDisc.prototype = Object.create(CGFobject.prototype);
 MyDisc.prototype.constructor = MyDisc;

 MyDisc.prototype.initBuffers = function() {
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
  this.texCoords = [];

  this.vertices.push(0,0,0);
  this.normals.push(0,0,1);
  this.texCoords.push(0.5,0.5);

		for(i = 0; i < this.slices; i++){

			this.vertices.push(Math.cos(i*this.angle), Math.sin(i*this.angle), 0);
      this.normals.push(0, 0, 1);

		}

		for(slice = 1; slice <= this.slices; slice++){

			if(slice == this.slices){
				this.indices.push(0,slice,1);
			}

			else{
				this.indices.push(0,slice,slice+1);
			}

		}

    for(i = 0; i < this.slices; i++){
      this.texCoords.push(((Math.cos(i*this.angle))/2) + 0.5 , ((Math.sin(i*this.angle)) /2) + 0.5);
		}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

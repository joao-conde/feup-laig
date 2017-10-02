/**
 * MySemiSphere
 * @constructor
 */
 function MySemiSphere(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
	this.angle = 2*Math.PI*1.0/slices;

  this.patchWidth = 1.0 / this.slices;
  this.patchHeight = 1.0 / this.stacks;

 	this.initBuffers();
 };

 MySemiSphere.prototype = Object.create(CGFobject.prototype);
 MySemiSphere.prototype.constructor = MySemiSphere;

 MySemiSphere.prototype.initBuffers = function() {

	this.vertices = [];
	this.normals = [];
  this.indices = [];
  this.texCoords = [];

	var angleIterator = (1.0*Math.PI/2)/this.stacks;

	for(stack = 0; stack <= this.stacks; stack++){

		for(i = 0; i < this.slices; i++){

			//Ponto 1

			this.vertices.push(Math.cos(i*this.angle)*Math.cos(stack*angleIterator));
			this.vertices.push(Math.sin(i*this.angle)*Math.cos(stack*angleIterator));
			this.vertices.push(Math.sin(stack*angleIterator));

			this.normals.push(Math.cos(i*this.angle)*Math.cos(stack*angleIterator));
			this.normals.push(Math.sin(i*this.angle)*Math.cos(stack*angleIterator));
			this.normals.push(Math.sin(stack*angleIterator));

      this.texCoords.push(this.patchWidth*i, 1 - (this.patchHeight * stack));

		}

	}

	for(stack = 0; stack < this.stacks; stack++){

		for(slice = 0; slice < this.slices; slice++){

			if(slice == this.slices - 1){
				this.indices.push(this.slices*stack + slice);
				this.indices.push(this.slices*stack + 0);
				this.indices.push(this.slices*(stack+1) + slice);

				this.indices.push(this.slices*(stack+1) + slice);
				this.indices.push(this.slices*stack + 0);
				this.indices.push(this.slices*(stack+1) + 0);
			}
			else{
				this.indices.push(this.slices*stack + slice);
				this.indices.push(this.slices*stack + slice + 1);
				this.indices.push(this.slices*(stack+1) + slice);

				this.indices.push(this.slices*(stack+1) + slice);
				this.indices.push(this.slices*stack + slice + 1);
				this.indices.push(this.slices*(stack+1) + slice + 1);

			}

		}

	}

	var currentVerticesBases = this.vertices.length;

	// BASE 1
	this.vertices.push(0);
	this.vertices.push(0);
	this.vertices.push(0);

	this.normals.push(0);
	this.normals.push(0);
	this.normals.push(-1);

  this.texCoords.push(0.5, 0.5);

	for(i = 0; i < this.slices; i++){
		this.vertices.push(Math.cos(i*this.angle));
		this.vertices.push(Math.sin(i*this.angle));
		this.vertices.push(0);

		this.normals.push(0);
		this.normals.push(0);
		this.normals.push(-1);
	}

	for(i = 1; i <= this.slices; i++){
		if(i == this.slices){
			this.indices.push(currentVerticesBases/3 + 0);
			this.indices.push(currentVerticesBases/3 + 1);
			this.indices.push(currentVerticesBases/3 + i);
		}
		else{
			this.indices.push(currentVerticesBases/3 + 0);
			this.indices.push(currentVerticesBases/3 + i+1);
			this.indices.push(currentVerticesBases/3 + i);
		}
	}

  for(i = 0; i < this.slices; i++){
    this.texCoords.push(((Math.cos(i*this.angle))/2) + 0.5 , ((Math.sin(i*this.angle)) /2) + 0.5);
  }

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

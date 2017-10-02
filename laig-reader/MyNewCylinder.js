/**
 * MyNewCylinder
 * @constructor
 */
 function MyNewCylinder(scene, bottomRadius, topRadius, slices, stacks) {
 	CGFobject.call(this,scene);

 	this.bottomRadius = bottomRadius;
 	this.topRadius = topRadius;
	this.slices = slices;
	this.stacks = stacks;
	this.angle = 2*Math.PI*1.0/slices;

	this.patchWidth = 1.0 / this.slices;
  	this.patchHeight = 1.0 / this.stacks;

 	this.initBuffers();
 };

 MyNewCylinder.prototype = Object.create(CGFobject.prototype);
 MyNewCylinder.prototype.constructor = MyNewCylinder;

 MyNewCylinder.prototype.initBuffers = function() {
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

	var dif = this.bottomRadius - this.topRadius;
	var step = dif / this.stacks;
	var radius = this.bottomRadius;

	var angleIterator = (this.BottomRadius - this.topRadius)/this.stacks;

	for(stack = 0; stack <= this.stacks; stack++){

		//var radius = stack == 0 ? this.bottomRadius : this.topRadius;

		if(stack == 0)
			radius = this.bottomRadius;
		else
			radius -= step; 

		for(i = 0; i < this.slices; i++) {

			this.vertices.push(Math.cos(i*this.angle) * radius);
			this.vertices.push(Math.sin(i*this.angle) * radius);
			this.vertices.push(1.0*stack/this.stacks);

				
			this.normals.push(Math.cos(i*this.angle) * radius);
			this.normals.push(Math.sin(i*this.angle) * radius);
			this.normals.push(radius);

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
		this.vertices.push(Math.cos(i*this.angle) * this.bottomRadius);
		this.vertices.push(Math.sin(i*this.angle) * this.bottomRadius);
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

	// BASE 2
	this.vertices.push(0);
	this.vertices.push(0);
	this.vertices.push(1);

	this.normals.push(0);
	this.normals.push(0);
	this.normals.push(1);

	this.texCoords.push(0.5, 0.5);

	for(i = 0; i < this.slices; i++){
		this.vertices.push(Math.cos(i*this.angle) * this.topRadius);
		this.vertices.push(Math.sin(i*this.angle) * this.topRadius);
		this.vertices.push(1);

		this.normals.push(0);
		this.normals.push(0);
		this.normals.push(1);
	}

	for(i = 1; i <= this.slices; i++){
		if(i == this.slices){
			this.indices.push(currentVerticesBases/3 + (this.slices+1)+0);
			this.indices.push(currentVerticesBases/3 + (this.slices+1)+i);
			this.indices.push(currentVerticesBases/3 + (this.slices+1)+1);
		}
		else{
			this.indices.push(currentVerticesBases/3 + (this.slices+1)+0);
			this.indices.push(currentVerticesBases/3 + (this.slices+1)+i);
			this.indices.push(currentVerticesBases/3 + (this.slices+1)+i+1);
		}
	}

	for(i = 0; i < this.slices; i++){
    	this.texCoords.push(((Math.cos(i*this.angle))/2) + 0.5 , ((Math.sin(i*this.angle)) /2) + 0.5);
  	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 

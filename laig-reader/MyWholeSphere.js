/**
 * MyWholeSphere
 * @constructor
 */
 function MyWholeSphere(scene, radius, slices, stacks) {
 	CGFobject.call(this,scene);

	if(slices < 10) 
		this.slices = 10;
	else if(slices > 200)
		this.slices = 200;
	else
		this.slices = slices;

	if(stacks < 10) 
		this.stacks = 10;
	else if(stacks > 200)
		this.stacks = 200;
	else
		this.stacks = stacks;

	this.radius = radius;

	this.angle = 2*Math.PI*1.0/this.slices;

  	this.patchWidth = 1.0 / this.slices;
  	this.patchHeight = 1.0 / this.stacks;

 	this.initBuffers();
 };

 MyWholeSphere.prototype = Object.create(CGFobject.prototype);
 MyWholeSphere.prototype.constructor = MyWholeSphere;

 MyWholeSphere.prototype.initBuffers = function() {

	this.vertices = [];
	this.normals = [];
  	this.indices = [];
  	this.texCoords = [];

	var angleIterator = (1.0*Math.PI)/this.stacks;

	for(var stack = 0; stack <= this.stacks; stack++){

		for(var slice = 0; slice < this.slices; slice++){

			var x = Math.sin(slice*this.angle)*Math.sin(stack*angleIterator) * this.radius;
			var y = Math.cos(stack*angleIterator) * this.radius;//* side; // corresponde ao raio da circunferencia da stack atual
			var z = Math.cos(slice*this.angle) * Math.sin(stack*angleIterator) * this.radius;

			this.vertices.push(x,y,z);
			this.normals.push(x,y,z);

			

		}

	}

	for(var stack = 0; stack <= this.stacks; stack++){

		for(var slice = 0; slice < this.slices; slice++){

			var texCoordS = slice == this.slices - 1 ? 1 : this.patchWidth*slice;
			var texCoordT = stack == this.stacks ? 1 : this.patchHeight * stack;

      		this.texCoords.push(texCoordS,texCoordT);

		}

	}

	for(var stack = 0; stack < this.stacks; stack++){

		for(slice = 0; slice < this.slices; slice++) {

			var next_slice = (slice == (this.slices - 1)) ? 0 : slice + 1;
			var next_stack = stack + 1;

			var _0 = this.slices*stack + slice;
			var _1 = this.slices*stack + next_slice;
			var _2 = this.slices*next_stack + slice;
			var _3 = this.slices*next_stack + next_slice;

			this.indices.push(_0, _2, _1);
			this.indices.push(_1, _2, _3);
			
		}

	}

	var currentVerticesBases = this.vertices.length;

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

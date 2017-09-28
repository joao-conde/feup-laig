/**
 *
 MySphere
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


function MySphere(scene, radius, slices, stacks) {
	CGFobject.call(this,scene);

	this.scene = scene;
	this.radius = radius;
	this.primitive = new MySemiSphere(this.scene, slices, stacks);


};

MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor = MySphere;


MySphere.prototype.display = function () {


	this.scene.pushMatrix();
	this.scene.scale(this.radius, this.radius, this.radius);
	this.primitive.display();
	this.scene.popMatrix();


	this.scene.pushMatrix();
	this.scene.rotateDeg(180,1,0,0);
	this.scene.scale(this.radius, this.radius, this.radius);
	this.primitive.display();
	this.scene.popMatrix();

}

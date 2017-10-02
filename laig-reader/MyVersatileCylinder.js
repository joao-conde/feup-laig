/**
 *
 MyVersatileCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


function MyVersatileCylinder(scene, height, bottomRadius, topRadius, slices, stacks) {
	CGFobject.call(this,scene);

	this.scene = scene;
	this.height = height;
	this.body = new MyNewCylinder(scene, bottomRadius, topRadius, slices, stacks)


};

MyVersatileCylinder.prototype = Object.create(CGFobject.prototype);
MyVersatileCylinder.prototype.constructor = MyVersatileCylinder;


MyVersatileCylinder.prototype.display = function () {


	this.scene.pushMatrix();
	this.scene.scale(1,1,this.height);
	this.body.display();
	this.scene.popMatrix();

}

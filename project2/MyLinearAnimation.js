/**
 * MyLinearAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyLinearAnimation(x0, y0, x1, y1, speed){

	//CGFobject.call(this,scene);

	MyAnimation.call(speed,[x0,y0,x1,y1]);



	//this.initBuffers();

};

MyLinearAnimation.prototype = Object.create(CGFobject.prototype);
MyLinearAnimation.prototype.constructor=MyLinearAnimation;
/*
MyLinearAnimation.prototype.initBuffers = function () {


	this.initGLBuffers();

};*/

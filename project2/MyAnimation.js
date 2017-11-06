/**
 * MyAnimation
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyAnimation(speed, controlPoints) {

	//CGFobject.call(this,scene);

	this.controlPoints = controlPoints;
	this.speed = speed;

	//this.initBuffers();
};

//MyAnimation.prototype = Object.create(CGFobject.prototype);
MyAnimation.prototype.constructor=MyAnimation;

/*
MyAnimation.prototype.initBuffers = function () {


	this.initGLBuffers();

};*/

/**
 * MyLinearAnimation
 * @constructor
 */

function MyLinearAnimation(controlPointsCoords, speed){

  MyAnimation.call(this);
  this.speed = speed / 1000;
  this.controlPointsCoords = controlPointsCoords;

  this.initialTime = 0;

  this.currentTranslation = [];
  this.currentRotation = 0;
  
  this.paths = [];

  var pathTime = 0;

  for(var i = 0; i < controlPointsCoords.length-1; i++) {

    var currentPath = [];

    var controlPoint1 = controlPointsCoords[i];
    var controlPoint2 = controlPointsCoords[i+1];

    currentPath.distance = this.calculateDistance(controlPoint1,controlPoint2);
  
    currentPath.cosAlfa = (controlPoint2[0] - controlPoint1[0]) / currentPath.distance;
    currentPath.sinAlfa = (controlPoint2[2] - controlPoint1[2]) / currentPath.distance;
  
    currentPath.speedX = this.speed * currentPath.cosAlfa;
    currentPath.speedZ = this.speed * currentPath.sinAlfa;
  
    currentPath.alfa = Math.acos(currentPath.cosAlfa);

    currentPath.initialPoint = controlPoint1;
    currentPath.finalPoint = controlPoint2;

    currentPath.initialTime = pathTime;
    currentPath.finalTime = pathTime + (currentPath.distance / this.speed) * 1000;

    pathTime = currentPath.finalTime;

    
    this.paths.push(currentPath);


  }

  console.log(this);


};


MyLinearAnimation.prototype = Object.create(MyAnimation.prototype);
MyLinearAnimation.prototype.constructor=MyLinearAnimation;
/*
MyLinearAnimation.prototype.initBuffers = function () {
	this.initGLBuffers();
};*/


MyLinearAnimation.prototype.calculateTranslation = function(deltaT) {

  var selectedPath = this.selectPath(deltaT);
  var deltaTPath = deltaT - selectedPath.initialTime;
  var deltaX = deltaT * selectedPath.speedX;
  var deltaZ = deltaT * selectedPath.speedZ;

  var translateX = selectedPath.initialPoint[0] + deltaX;
  var translateY = 0;
  var translateZ = selectedPath.initialPoint[2] + deltaZ;

  this.currentTranslation = [translateX,translateY,translateZ];


}

MyLinearAnimation.prototype.calculateRotation = function(deltaT) {

  this.currentRotation =  this.selectPath(deltaT).alfa;
}

MyLinearAnimation.prototype.selectPath = function(deltaT) {

  console.log(this.paths);

  for(var i = 0; i < this.paths.length; i++) {
  
    if(deltaT >= this.paths[i].initialTime && deltaT < this.paths[i].finalTime) {
      return this.paths[i];
    }
        
  }

}

MyLinearAnimation.prototype.update = function(currentTime) {

  if(this.initialTime == 0) {
    this.initialTime = currentTime;
  }
  else {
    
    var deltaTime = currentTime - this.initialTime;
    this.calculateTranslation(deltaTime);
    this.calculateRotation(deltaTime);
  
  }

}

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
  var totalTranslationX = 0;
  var totalTranslationY = 0;
  var totalTranslationZ = 0;

  for(var i = 0; i < controlPointsCoords.length-1; i++) {

    var currentPath = [];

    var controlPoint1 = controlPointsCoords[i];
    var controlPoint2 = controlPointsCoords[i+1];

    currentPath.distance = this.calculateDistance(controlPoint1,controlPoint2);
  
    currentPath.distanceInXOZ = this.calculateDistance([controlPoint1[0],controlPoint1[2]],[controlPoint2[0],controlPoint2[2]]);

    

    if(currentPath.distanceInXOZ == 0) {

      if(i == 0) {

        currentPath.beta = 0;
        currentPath.alfa = degToRad(90);
        

      }
      else {
        currentPath.beta = this.paths[i-1].beta;
        currentPath.alfa = this.paths[i-1].alfa;
      }

      currentPath.cosAlfa = Math.cos(currentPath.alfa);
      currentPath.sinAlfa = Math.sin(currentPath.alfa);
      currentPath.cosBeta = Math.cos(currentPath.beta);

    }
    
    else {

      currentPath.cosAlfa = (controlPoint2[0] - controlPoint1[0]) / currentPath.distanceInXOZ;
      currentPath.sinAlfa = (controlPoint2[2] - controlPoint1[2]) / currentPath.distanceInXOZ;
      currentPath.cosBeta = (controlPoint2[2] - controlPoint1[2]) / currentPath.distanceInXOZ;

      currentPath.beta = Math.acos(currentPath.cosBeta);
      currentPath.alfa = Math.acos(currentPath.cosAlfa);

    }

    var dir = currentPath.cosBeta > 0 ? -1 : 1;

    currentPath.alfa *= dir;

    var sinGama = (controlPoint2[1]-controlPoint1[1]) / currentPath.distance;
    var gama = Math.asin(sinGama);
    
    currentPath.speedX = currentPath.distanceInXOZ == 0 ? 0 : this.speed * currentPath.cosAlfa;
    currentPath.speedY = this.speed * sinGama;
    currentPath.speedZ = currentPath.distanceInXOZ == 0 ? 0 : this.speed * currentPath.sinAlfa;
  
    currentPath.initialPoint = controlPoint1;
    currentPath.finalPoint = controlPoint2;

    currentPath.initialTime = pathTime;
    currentPath.finalTime = pathTime + (currentPath.distance / this.speed);

    pathTime = currentPath.finalTime;

    totalTranslationX += (currentPath.distanceInXOZ == 0) ? 0 : currentPath.distance * currentPath.cosAlfa;
    totalTranslationY += currentPath.distance * sinGama;
    totalTranslationZ += (currentPath.distanceInXOZ == 0) ? 0 : currentPath.distance * currentPath.sinAlfa;

    currentPath.totalTranslationX = totalTranslationX;
    currentPath.totalTranslationY = totalTranslationY;
    currentPath.totalTranslationZ = totalTranslationZ;

    this.paths.push(currentPath);

    currentPath.alfaDeg = radToDeg(currentPath.alfa);
    currentPath.betaDeg = radToDeg(currentPath.beta);

    

  }

  console.log(this.paths);

};


MyLinearAnimation.prototype = Object.create(MyAnimation.prototype);
MyLinearAnimation.prototype.constructor=MyLinearAnimation;


MyLinearAnimation.prototype.calculateTranslation = function(deltaTimePath,selectedPathIndex) {

  var selectedPath = this.paths[selectedPathIndex];
  
  var accumulatedTranslationX = 0;
  var accumulatedTranslationY = 0;
  var accumulatedTranslationZ = 0;

  if(selectedPathIndex > 0) {
    accumulatedTranslationX = this.paths[selectedPathIndex-1].totalTranslationX;
    accumulatedTranslationY = this.paths[selectedPathIndex-1].totalTranslationY;
    accumulatedTranslationZ = this.paths[selectedPathIndex-1].totalTranslationZ;
  }
    

  if(selectedPath == null) 
    this.currentTranslation = [0,0,0];

  else {
  
    var deltaX = deltaTimePath * selectedPath.speedX;  
    var deltaY = deltaTimePath * selectedPath.speedY;
    var deltaZ = deltaTimePath * selectedPath.speedZ;
    var translateX = deltaX + accumulatedTranslationX;
    var translateY = deltaY + accumulatedTranslationY;
    var translateZ = deltaZ + accumulatedTranslationZ;

    this.currentTranslation = [translateX,translateY,translateZ];

  }


}

MyLinearAnimation.prototype.calculateRotation = function(selectedPath) {
  
  this.currentRotation =  selectedPath.alfa + degToRad(90);
  
}

MyLinearAnimation.prototype.selectPath = function(deltaTAnimation) {


  for(var i = 0; i < this.paths.length; i++) {
  
    if(deltaTAnimation >= this.paths[i].initialTime && deltaTAnimation < this.paths[i].finalTime) {
      return i;
    }
        
  }

  return null;

}

MyLinearAnimation.prototype.update = function(currentTime) {

  if(this.initialTime == 0) {
    this.initialTime = currentTime;
  }
  else {
    
    var deltaTimeAnimation = (currentTime - this.initialTime) % this.paths[this.paths.length-1].finalTime;
    var selectedPathIndex = this.selectPath(deltaTimeAnimation);
    var selectedPath = this.paths[selectedPathIndex];
    var deltaTimePath = deltaTimeAnimation - selectedPath.initialTime;

    this.calculateTranslation(deltaTimePath,selectedPathIndex);
    this.calculateRotation(selectedPath);

  }

}

function radToDeg(rad) {
  return 180*rad / Math.PI;
}

function degToRad(deg) {
  return Math.PI*deg / 180;
}

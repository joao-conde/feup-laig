/**
 * MyBezierAnimation
 * @constructor
 */

function MyBezierAnimation(controlPointsCoords, speed){
    
      MyAnimation.call(this);
      this.speed = speed / 1000;
      this.transformMatrix = mat4.create();
      this.controlPoints = [];
      this.type = "bezier";

      this.controlPointsCoords = controlPointsCoords;

      this.initialTime = 0;

      for(var i = 0; i < 4; i++)
        this.controlPoints.push([controlPointsCoords[i][0],controlPointsCoords[i][1],controlPointsCoords[i][2]]);
      
      this.totalDistance = this.calculateDistanceCJ(this.controlPoints,10);

      this.totalTime = this.totalDistance/this.speed;

      this.oldTranslation = [0,0,0];

    };
    
    
MyBezierAnimation.prototype = Object.create(MyAnimation.prototype);
MyBezierAnimation.prototype.constructor=MyBezierAnimation;


MyBezierAnimation.prototype.calculateMatrix = function(deltaTimeAnimation) {

  
  mat4.identity(this.transformMatrix);

  var s = deltaTimeAnimation/this.totalTime;
  var bezierPos = this.bezierPos(s);
  var translation = [bezierPos[0], bezierPos[1], bezierPos[2], bezierPos[3]];
  

  /*
  var tan = [translation[0] - this.oldTranslation[0], translation[2] - this.oldTranslation[2]];
  this.oldTranslation = translation;
  */
  
  var tan = [bezierPos[0] - this.oldTranslation[0], bezierPos[2] - this.oldTranslation[2]];
  this.oldTranslation = bezierPos;
  

  this.alfa = Math.atan2(tan[0],tan[1]);

  mat4.translate(this.transformMatrix, this.transformMatrix, [translation[0], translation[1], translation[2]]);
  mat4.rotate(this.transformMatrix, this.transformMatrix, this.alfa, [0,1,0]);

}


    
MyBezierAnimation.prototype.update = function(currentTime) {

  if(this.initialTime == 0) {
    this.initialTime = currentTime;
    this.finalTime = currentTime+this.totalTime;
  }
  //else {
    
    var deltaTimeAnimation = (currentTime - this.initialTime) % this.totalTime;
    this.calculateMatrix(deltaTimeAnimation);
    

  //}

}


MyBezierAnimation.prototype.calculateDistanceCJ = function(controlPoints, level) {

    var controlPoint1 = controlPoints[0];
    var controlPoint2 = controlPoints[1];
    var controlPoint3 = controlPoints[2];
    var controlPoint4 = controlPoints[3];


    if(level == 0) {
      return this.calculateDistance(controlPoint1,controlPoint2) + 
              this.calculateDistance(controlPoint2,controlPoint3) + 
              this.calculateDistance(controlPoint3,controlPoint4);
    }

    else if(level > 0) {

      var mid12 = this.calculateMidPoint(controlPoint1,controlPoint2);
      var mid23 = this.calculateMidPoint(controlPoint2,controlPoint3);
      var mid34 = this.calculateMidPoint(controlPoint3,controlPoint4);

      var mid1223 = this.calculateMidPoint(mid12,mid23);
      var mid2334 = this.calculateMidPoint(mid23,mid34);
      var mid = this.calculateMidPoint(mid1223,mid2334);

      var left = [controlPoint1,mid12,mid1223,mid];
      var right = [mid,mid2334,mid34,controlPoint4];

      return this.calculateDistanceCJ(left,level-1) + this.calculateDistanceCJ(right,level-1);

    }

}

MyBezierAnimation.prototype.calculateMidPoint = function(point1,point2) {

  var result = []

  for(var i = 0; i < point1.length; i++) {

    var coord = (point2[i] - point1[i]) / 2;
    result.push(coord + point1[i]);

  }

  return result;

}

MyBezierAnimation.prototype.bezierPos = function(s) {

  var result = [];

  for(var i = 0; i < 3; i++) 
    result.push(Math.pow(1-s,3) * this.controlPoints[0][i] + 
                3*s*Math.pow(1-s,2)*this.controlPoints[1][i] + 
                3*Math.pow(s,2)*(1-s)*this.controlPoints[2][i] + 
                Math.pow(s,3)*this.controlPoints[3][i]);

  return result;


}

    
    
    
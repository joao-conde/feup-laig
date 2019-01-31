/**
 * MyCircularAnimation
 * @constructor
 */

function MyCircularAnimation(center, speed,radius,startAng,rotAng){
    
      MyAnimation.call(this);
      this.speed = speed / 1000;
      this.center = center;
      this.radius = radius;
      this.startAng = startAng;
      this.rotAng = rotAng;
      this.type = "circular";
      this.initialTime = 0;
      
    
      this.angularSpeed = this.speed/this.radius;

      this.totalTime = this.degToRad(this.rotAng)/this.angularSpeed;

      this.transformMatrix = mat4.create();

    };
    
    
MyCircularAnimation.prototype = Object.create(MyAnimation.prototype);
MyCircularAnimation.prototype.constructor=MyCircularAnimation;


MyCircularAnimation.prototype.calculateMatrix = function(deltaTimeAnimation) {

    var angle = this.degToRad(this.startAng) + this.angularSpeed*deltaTimeAnimation;

    
    mat4.identity(this.transformMatrix);
    
    mat4.translate(this.transformMatrix, this.transformMatrix, [this.center[0], this.center[1], this.center[2]]);
    mat4.rotate(this.transformMatrix, this.transformMatrix, angle, [0,1,0]);
    mat4.translate(this.transformMatrix, this.transformMatrix, [this.radius, 0, 0]);
    mat4.rotate(this.transformMatrix, this.transformMatrix, this.degToRad(180), [0,1,0]);

    
}


    
MyCircularAnimation.prototype.update = function(currentTime) {

  if(this.initialTime == 0) {
    this.initialTime = currentTime;
    this.finalTime = currentTime+this.totalTime;
  }

    
  var deltaTimeAnimation = (currentTime - this.initialTime) % this.totalTime;


  this.calculateMatrix(deltaTimeAnimation);


  

}
    
    
    
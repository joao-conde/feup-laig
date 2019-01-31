/**
 * MyComboAnimation
 * @constructor
 */

function MyComboAnimation(animationsArray){
    
    MyAnimation.call(this);
    this.initialTime = 0;
    this.type = "combo";

      
    this.animationsArray = this.copyAnimations(animationsArray);

    this.oldAnimation = this.animationsArray[0];

    
    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);

    this.timesArray = [];
    var animationTime = 0;
    for(var i = 0; i < this.animationsArray.length; i++) {

        var initialTime = animationTime;
        var finalTime = animationTime + this.animationsArray[i].totalTime;
        animationTime = finalTime;

        this.timesArray.push([initialTime,finalTime]);

    }

    this.totalTime = animationTime;
    
    console.log(this);

    };
    
    
MyComboAnimation.prototype = Object.create(MyAnimation.prototype);
MyComboAnimation.prototype.constructor=MyComboAnimation;


MyComboAnimation.prototype.calculateMatrix = function(deltaTimeAnimation,currentTime) {

    
    var currentAnimation = this.findAnimation(deltaTimeAnimation);
    if(currentAnimation != this.oldAnimation)
        currentAnimation.initialTime = 0;
    currentAnimation.update(currentTime);
    this.transformMatrix = currentAnimation.transformMatrix;
    this.oldAnimation = currentAnimation;

    

}


    
MyComboAnimation.prototype.update = function(currentTime) {

    if(this.initialTime == 0) {
        this.initialTime = currentTime;
        this.finalTime = currentTime+this.totalTime;
    }
    else {
    
        var deltaTimeAnimation = (currentTime - this.initialTime) % this.totalTime;
        this.calculateMatrix(deltaTimeAnimation,currentTime);


    }

}

MyComboAnimation.prototype.findAnimation = function(deltaTimeAnimation) {

    for(var i = 0; i < this.animationsArray.length; i++) {

        if(deltaTimeAnimation >= this.timesArray[i][0] && deltaTimeAnimation < this.timesArray[i][1])
            return this.animationsArray[i];

    }


}

MyComboAnimation.prototype.copyAnimations = function(animationsArray) {

    var result = [];

    for(var i = 0; i < animationsArray.length; i++) {

        var currentAnimation = animationsArray[i];

        if(animationsArray[i].type == 'linear') {

            result.push(new MyLinearAnimation(currentAnimation.controlPointsCoords,currentAnimation.speed*1000));

        }
        else if(animationsArray[i].type == 'circular') {

            result.push(new MyCircularAnimation(currentAnimation.center,currentAnimation.speed*1000,currentAnimation.radius,currentAnimation.startAng,currentAnimation.rotAng));

        }

        else if(animationsArray[i].type == 'bezier') {

            result.push(new MyBezierAnimation(currentAnimation.controlPointsCoords,currentAnimation.speed*1000));

        }
        

    }

    return result;


}
    
    
    
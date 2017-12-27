/**
 *
 MyPlayer
 */


function MyPlayer(name) {
    
    this.name = name;
    this.score = 0;

};

MyPlayer.prototype = Object.create(CGFobject.prototype);
MyPlayer.prototype.constructor = MyPlayer;
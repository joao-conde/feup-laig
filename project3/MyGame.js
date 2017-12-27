/**
 *
 MyGame
 */


function MyGame(scene,namePlayer1,namePlayer2) {
    
    this.player1 = new MyPlayer(namePlayer1);
    this.player2 = new MyPlayer(namePlayer2);
    this.board = new MyBoard(scene);

};

MyGame.prototype = Object.create(CGFobject.prototype);
MyGame.prototype.constructor = MyGame;
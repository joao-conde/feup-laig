const BOARD_HEIGHT = 3.4;
const BOARD_WIDTH = 8.2;

/**
 *
 MyGame
 */


function MyGame(scene, namePlayer1, namePlayer2, gameMode, difficulty) {
    
    this.board = new MyBoard(scene);
    this.scene = scene;
    this.piece = new MyNijuPiece(scene);

    this.player1 = new MyPlayer(this.scene,namePlayer1,"white");
    this.player2 = new MyPlayer(this.scene,namePlayer2,"black");

    console.log(this.player2);

    this.gameMode = gameMode;
    this.difficulty = difficulty;


    this.startGame();

    

};

MyGame.prototype = Object.create(CGFobject.prototype);
MyGame.prototype.constructor = MyGame;

MyGame.prototype.startGame = function() {

    console.log("game will start");

    

    if(this.gameMode == 0) 
        var prologMode = "humanVshuman";


    //TODO: gameMode and difficulty

    this.makeRequest('getPiecesP1', this.handleReplyPieces.bind(this,this.player1));
    this.makeRequest('getPiecesP2', this.handleReplyPieces.bind(this,this.player2));

    console.log(this.gameMode);


}



MyGame.prototype.getPrologRequest = function(requestString, onSuccess, onError, port) {
    
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, false);

    request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
    request.onerror = onError || function(){console.log("Error waiting for response");};

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}
		
MyGame.prototype.makeRequest = function(requestString, handle) {
    				
    // Make Request
    this.getPrologRequest(requestString, handle);
}
			
//Handle the Reply
MyGame.prototype.handleReplyPieces = function(player,data) {
   

    player.createPieces(JSON.parse(data.target.responseText));

    
}

MyGame.prototype.display = function() {

    this.board.display();
    this.player1.displayPieces(this.piece);
    // this.player2.displayPieces(this.piece);


}
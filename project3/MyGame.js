const BOARD_HEIGHT = 3.4;
const BOARD_WIDTH = 8.4;
const BOARD_X = 11.2;

const EMPTY_SPACE = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];

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

    this.updateScore();

    document.querySelector("p#message").innerHTML = "";

    console.log(this.player2);

    this.gameMode = gameMode;
    this.difficulty = difficulty;

    this.numberOfTurns = 0;

    this.currentPlayer = this.player1;

    this.selectedPiece = -1;
    this.selectedPosition = -1;

    this.destinationRow = -1;
    this.destinationColumn = -1;
    

    this.startGame();

    this.liftPieceAnimation = new MyLinearAnimation([[0,0,0],[0,1,0]],5);

    this.movePieceAnimations = this.createMoveAnimations();


};


MyGame.prototype = Object.create(CGFobject.prototype);
MyGame.prototype.constructor = MyGame;

MyGame.prototype.createMoveAnimations = function() {

    var result = [];

    var offsetX = BOARD_X / 2 - (this.board.board[0].length * 0.4) / 2;
    var offsetY = BOARD_WIDTH / 2 - this.board.board.length * 0.4 / 2 + 0.4;

    
    for(var i = 0; i < this.board.board.length; i++) {

        var row = [];
        for(var j = 0; j < this.board.board[i].length; j++) {

            var finalPosition = [offsetX + 0.4 * i, BOARD_HEIGHT, offsetY + 0.4 * j];
            var initialPosition = [1 + i*0.45,BOARD_HEIGHT, BOARD_WIDTH - PIECE_WIDTH - 0.05];
            var delta = [finalPosition[0]-initialPosition[0], finalPosition[1]-initialPosition[1],finalPosition[2]-initialPosition[2]];

            var speed = 1;
            var points = [
                [0,0,0],
                [0,0,5],
                [offsetX+0.4*j, BOARD_HEIGHT+4, offsetY+0.4*i],
                [finalPosition[0], finalPosition[1], finalPosition[2]]
            ]

            //row.push(new MyBezierAnimation(points,speed));

            row.push(new MyLinearAnimation([points[0],points[3]],speed));

        }
        result.push(row);

    }

    return result;

}

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
    //TODO:uncomment // request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, false);

    request.open('GET', 'http://172.30.2.119:'+requestPort+'/'+requestString, false);

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

    console.log(player.pieces);

    
}


MyGame.prototype.handleReplyPlay = function(player,data) {

    var valid = data.target.responseText == "true" ? true : false;

    if(!valid)
        return;


    this.playPiece();

    var requestString = JSON.stringify(this.board.board);
    this.makeRequest(requestString, this.handlePlayersScores.bind(this));


}

MyGame.prototype.handlePlayersScores = function(data) {

    var response = JSON.parse(data.target.responseText);

    this.player1.score = response[0];
    this.player2.score = response[1];
    
    this.updateScore();

}

MyGame.prototype.updateScore = function() {

    document.querySelector("p#p1Score").innerHTML = this.player1.score;
    document.querySelector("p#p2Score").innerHTML = this.player2.score;

}

MyGame.prototype.display = function() {

    this.board.display();
    this.player1.displayPieces(this.piece);
    this.player2.displayPieces(this.piece);

}

MyGame.prototype.play = function() {

    if(this.selectedPiece == -1 || this.selectedPosition == -1)
        return;

    if(this.numberOfTurns == 0 && this.selectedPiece >= 0 && this.selectedPiece < 20)
        this.playPiece();

    else {

        if(this.currentPlayer == this.player1) {
            
            if(this.selectedPiece >= 0 && this.selectedPiece < 20) {
    
                console.log("Player 1 playing");
    
                var column = this.calculateColumn(this.selectedPosition-40, this.board.board[0].length);
                var row = this.calculateRow(this.selectedPosition-40, column, this.board.board[0].length);
                
                var requestString = JSON.stringify([this.board.board, row,column]);

                this.makeRequest(requestString, this.handleReplyPlay.bind(this,this.player1));
    
            }
    
        }
                
        
        else if(this.currentPlayer == this.player2) {
            
            if(this.selectedPiece >= 20 && this.selectedPiece < 40) {
    
                console.log("Player 2 playing");
    
                var column = this.calculateColumn(this.selectedPosition-40, this.board.board[0].length);
                var row = this.calculateRow(this.selectedPosition-40, column, this.board.board[0].length);
                
                var requestString = JSON.stringify([this.board.board, row,column]);

                this.makeRequest(requestString, this.handleReplyPlay.bind(this,this.player2));
    
            }
    
        } 

    }
    
}

MyGame.prototype.playPiece = function() {

    var piece = this.currentPlayer == this.player1 ? this.selectedPiece : this.selectedPiece - 20;

    var column = this.calculateColumn(this.selectedPosition-40, this.board.board[0].length);
    var row = this.calculateRow(this.selectedPosition-40, column, this.board.board[0].length);

    this.board.board[row][column] = this.currentPlayer.pieces[piece];

    console.log("Piece Played:" + piece);
    console.log("Piece Original Played:" + this.selectedPiece);
    console.log(this.currentPlayer);

    this.currentPlayer.removePiece(piece);

    this.selectedPiece = -1;
    this.selectedPosition = -1;
    this.numberOfTurns++;

    this.destinationRow = row;
    this.destinationColumn = column;

    

    this.switchPlayer();
    this.checkGameOver();


}

MyGame.prototype.checkGameOver = function() {

    if(this.numberOfTurns == 40) {
        console.log("Game Over P1: " + this.player1.score + "P2: " + this.player2.score);
        this.scene.gameInProgress = false;

        if(this.player1.score > this.player2.score)
            var message = "Game Over. " + this.player1.name + " is the winner!";
        
        else if(this.player1.score < this.player2.score)
            var message = "Game Over. " + this.player2.name + " is the winner!";

        else
            var message = "Game Over. It's a draw!";

        var message_p = document.querySelector("p#message");
        message_p.innerHTML = message;

      
    }

}

MyGame.prototype.switchPlayer = function() {

    if(this.currentPlayer == this.player1){

        this.currentPlayer = this.player2;
        this.scene.cameraIndex = 2;

    }
    else{
        this.currentPlayer = this.player1; 
        this.scene.cameraIndex = 1;
    }
}

MyGame.prototype.calculateRow = function(id, col, number_cols) {

    return (id - col) / number_cols;

}

MyGame.prototype.calculateColumn = function(id, number_cols) {

    return id % number_cols;

}

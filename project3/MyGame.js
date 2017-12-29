const BOARD_HEIGHT = 3.4;
const BOARD_WIDTH = 8.2;
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

    console.log(this.player2);

    this.gameMode = gameMode;
    this.difficulty = difficulty;

    this.numberOfTurns = 0;

    this.currentPlayer = this.player1;

    this.selectedPiece = -1;
    this.selectedPosition = -1;

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
    // request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, false);

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

MyGame.prototype.handleReplyInitialBoard = function(data) {

    console.log(data);
    this.board.updateBoard(JSON.parse(data.target.responseText));
    console.log(this.board);

}

MyGame.prototype.handleReplyPlay = function(player,data) {

    var valid = data.target.responseText == "true" ? true : false;

    if(!valid)
        return;


    this.playPiece();

    console.log(this.currentPlayer);

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
    this.currentPlayer.removePiece(piece);

    this.selectedPiece = -1;
    this.selectedPosition = -1;
    this.numberOfTurns++;

    this.switchPlayer();

}

MyGame.prototype.switchPlayer = function() {

    if(this.currentPlayer == this.player1)
        this.currentPlayer = this.player2;
    else
        this.currentPlayer = this.player1;

}

MyGame.prototype.calculateRow = function(id, col, number_cols) {

    return (id - col) / number_cols;

}

MyGame.prototype.calculateColumn = function(id, number_cols) {

    return id % number_cols;

}

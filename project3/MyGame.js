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

    this.gameMode = gameMode;
    this.difficulty = difficulty;

    this.numberOfTurns = 0;

    this.currentPlayer = this.player1;

    this.selectedPiece = -1;
    this.selectedPosition = -1;

    this.destinationRow = -1;
    this.destinationColumn = -1;

    this.clock = new MyClock(scene);
    

    this.startGame();

    window.addEventListener('keyup', this.handleKeys.bind(this));

    this.liftPieceAnimation = new MyLinearAnimation([[0,0,0],[0,1,0]],5);

    this.rotatedPiece = 0;
    this.computerSelectedPos = 0;

    var p1 = document.querySelector("p#p1Name");
    var p2 = document.querySelector("p#p2Name");

    p1.innerHTML = this.player1.name + ": ";
    p2.innerHTML = this.player2.name + ": ";

};


MyGame.prototype = Object.create(CGFobject.prototype);
MyGame.prototype.constructor = MyGame;

MyGame.prototype.handleKeys = function(event) {
    if(event.keyCode == 32)
        this.rotatePiece();
    else if(event.keyCode == 13)
        this.makeComputerMove();

}

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


    this.makeRequest('getPiecesP1', this.handleReplyPieces.bind(this,this.player1));
    this.makeRequest('getPiecesP2', this.handleReplyPieces.bind(this,this.player2));

    this.initialTime = 0;

}



MyGame.prototype.getPrologRequest = function(requestString, onSuccess, onError, port) {
    
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    //TODO:uncomment 
    request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, false);

    // request.open('GET', 'http://172.30.2.119:'+requestPort+'/'+requestString, false);

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

MyGame.prototype.handleReplyPlay = function(player,data) {

    var valid = data.target.responseText == "true" ? true : false;

    if(!valid)
        return;


    this.playPiece();

    


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

    this.selectedPiece = -1;
    this.selectedPosition = -1;
    this.numberOfTurns++;

    
    this.checkGameOver();

}

MyGame.prototype.display = function() {

    this.board.display();
    this.player1.displayPieces(this.piece);
    this.player2.displayPieces(this.piece);
    this.scene.pushMatrix();
    this.scene.translate(-7.5,10,7.7);
    this.scene.scale(2,2,2);
    this.scene.rotateDeg(90,0,1,0);
    this.clock.display();
    this.scene.popMatrix();

}

MyGame.prototype.play = function() {

    if(this.selectedPiece == -1 || this.selectedPosition == -1)
        return;

    if(this.numberOfTurns == 0 && this.selectedPiece >= 0 && this.selectedPiece < 20)
        this.playPiece();

    else {

        if(this.currentPlayer == this.player1) {

            if(this.gameMode == 0 || this.gameMode == 1) {

                if(this.selectedPiece >= 0 && this.selectedPiece < 20) {
    
                    var column = this.calculateColumn(this.selectedPosition-40, this.board.board[0].length);
                    var row = this.calculateRow(this.selectedPosition-40, column, this.board.board[0].length);
                    
                    var requestString = JSON.stringify([this.board.board, row,column]);
    
                    this.makeRequest(requestString, this.handleReplyPlay.bind(this,this.player1));
        
                }

            } 

            
        }
                
        
        else if(this.currentPlayer == this.player2) {

            if(this.gameMode == 0) {

                if(this.selectedPiece >= 20 && this.selectedPiece < 40) {
    
                    var column = this.calculateColumn(this.selectedPosition-40, this.board.board[0].length);
                    var row = this.calculateRow(this.selectedPosition-40, column, this.board.board[0].length);
                    
                    var requestString = JSON.stringify([this.board.board, row,column]);
    
                    this.makeRequest(requestString, this.handleReplyPlay.bind(this,this.player2));
        
                }
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


    this.destinationRow = row;
    this.destinationColumn = column;

    var requestString = JSON.stringify(this.board.board);
    this.makeRequest(requestString, this.handlePlayersScores.bind(this));


}

MyGame.prototype.checkGameOver = function() {

    if(this.numberOfTurns == 40) {
        

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

    else 
        this.switchPlayer();

}

MyGame.prototype.switchPlayer = function() {

    var p1 = document.querySelector("p#p1Name");
    var p2 = document.querySelector("p#p2Name");

    if(this.currentPlayer == this.player1){

        this.currentPlayer = this.player2;
        p1.style.textDecoration = "none";
        p2.style.textDecoration = "underline";


    }
    else {

        this.currentPlayer = this.player1; 
        p1.style.textDecoration = "underline";
        p2.style.textDecoration = "none";
    }

    this.rotatedPiece = 0;
    this.computerSelectedPos = 0;
}

MyGame.prototype.calculateRow = function(id, col, number_cols) {

    return (id - col) / number_cols;

}

MyGame.prototype.calculateColumn = function(id, number_cols) {

    return id % number_cols;

}

MyGame.prototype.updateGameTime = function(time) {

    if(this.initialTime == 0)
        this.initialTime = time;

    var deltaTime = time - this.initialTime;

    this.clock.update(deltaTime);


}

MyGame.prototype.rotatePiece = function() {

    if(this.scene.gameInProgress) {

        if(this.selectedPiece != -1 && this.selectedPosition == -1) {

            var piece = this.currentPlayer == this.player1 ? this.currentPlayer.pieces[this.selectedPiece] : this.currentPlayer.pieces[this.selectedPiece-20];

            var requestString = JSON.stringify([-100,piece]);

            this.makeRequest(requestString,this.handleRotatedPiece.bind(this));

        }
    }

} 


MyGame.prototype.handleRotatedPiece = function(data) {

    var response = JSON.parse(data.target.responseText);

    if(this.currentPlayer == this.player1)
        this.player1.pieces[this.selectedPiece] = response;

    else
        this.player2.pieces[this.selectedPiece-20] = response;


}


MyGame.prototype.makeComputerMove = function() {

    console.log(this.numberOfTurns);

    if(this.gameMode == 0)
        return;

    if(this.selectedPiece == -1) {

        var pieceIndex = this.currentPlayer.selectPiece();
        this.selectedPiece = this.currentPlayer == this.player1 ? pieceIndex : pieceIndex + 20;

    }

    else if(this.selectedPiece != -1 && this.selectedPosition == -1) {

        if(this.rotatedPiece == 0) {

            var selectedPiece = this.currentPlayer == this.player1 ? this.selectedPiece : this.selectedPiece - 20;
            var requestString = JSON.stringify([-198, [this.currentPlayer.pieces, selectedPiece]]);
            
            

            this.makeRequest(requestString, this.handleComputerPieceRotation.bind(this));

        }

        else {

            if(this.computerSelectedPos == 0) {

                switch(this.difficulty) {

                    case 0:
    
                        var id = this.currentPlayer == this.player1 ? -197 : -297;
                        break;
    
                    case '1':
                        var id = this.currentPlayer == this.player1 ? -196 : -296;
                        break;
    
                    case '2':
                        var id = this.currentPlayer == this.player1 ? -195 : -295;
                        break;
    
                    default:
    
                }
    
                if(this.numberOfTurns == 0)
                    this.makeRequest('initialTurn', this.handlerSelectComputerPosition.bind(this));
                else {

                    var requestString = JSON.stringify([id, [ this.board.board]]);
                    this.makeRequest(requestString, this.handlerSelectComputerPosition.bind(this));

                }

                

            }

        }

    }

}

MyGame.prototype.handleComputerPieceRotation = function(data) {

    var rotatedPiece = JSON.parse(data.target.responseText);
    
    var selectedPiece = this.currentPlayer == this.player1 ? this.selectedPiece : this.selectedPiece - 20; 

    this.currentPlayer.pieces[selectedPiece] = rotatedPiece;

    this.rotatedPiece = 1;


}

MyGame.prototype.handlerSelectComputerPosition = function(data) {



    var response = JSON.parse(data.target.responseText);

    this.selectedPosition = (parseInt(response[0]) * this.board.board[0].length + parseInt(response[1])) + 40;

    this.computerSelectedPos = 1;

    this.playPiece();


    



}
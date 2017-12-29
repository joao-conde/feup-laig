/**
 *
 MyPlayer
 */


function MyPlayer(scene,name,color) {
    
    this.name = name;
    this.score = 0;
    this.scene = scene;
    this.color = color;

    this.pieces = [];

};

MyPlayer.prototype = Object.create(CGFobject.prototype);
MyPlayer.prototype.constructor = MyPlayer;

MyPlayer.prototype.createPieces = function(pieces){
    this.pieces = pieces;
}

MyPlayer.prototype.displayPieces = function(piece) {

    if(this.color == "white") {

        for(var i = 0; i < this.pieces.length; i++) {

            if(this.pieces[i][0][0] == -1)
                continue;

            this.scene.pushMatrix();
            
            
            if(this.scene.game.selectedPiece == i) { 

                if(this.scene.game.currentPlayer == this)
                    this.scene.multMatrix(this.scene.game.liftPieceAnimation.transformMatrix);

                // else {

                //     if(this.scene.game.isPlaying == true) {
                //         this.scene.multMatrix(this.scene.game.movePieceAnimations[this.scene.game.destinationRow][this.scene.game.destinationColumn].transformMatrix);
                //     }

                // }

                

            }

            this.scene.translate(1 + i*0.45,BOARD_HEIGHT, BOARD_WIDTH - PIECE_WIDTH - 0.05);
            
            this.scene.rotateDeg(-90,0,1,0);

            

            

            this.scene.registerForPick(i,piece);

            
            
    
            piece.display(this.pieces[i],this.color);
            this.scene.popMatrix();
    
        }


    }

    else if(this.color == "black") {


        for(var i = 0; i < this.pieces.length; i++) {

            if(this.pieces[i][0][0] == -1)
                continue;

            this.scene.pushMatrix();
            
            this.scene.translate(1+PIECE_WIDTH + (this.pieces.length-1-i)*0.45,BOARD_HEIGHT,PIECE_WIDTH +0.05);
            this.scene.rotateDeg(180,0,1,0);
            this.scene.rotateDeg(-90,0,1,0);
            this.scene.registerForPick(i+20,piece);

            if(this.scene.game.selectedPiece == i+20 && this.scene.game.currentPlayer == this)
                this.scene.multMatrix(this.scene.game.liftPieceAnimation.transformMatrix);

            piece.display(this.pieces[i],this.color);
            this.scene.popMatrix();
    
        }

    }


} 

MyPlayer.prototype.removePiece = function(pieceNumber) {

    this.pieces[pieceNumber] = EMPTY_SPACE;

}
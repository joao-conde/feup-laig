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

            this.scene.pushMatrix();
            this.scene.translate(1 + i*0.45,BOARD_HEIGHT + PIECE_WIDTH, BOARD_WIDTH);
            this.scene.rotateDeg(-90,0,0,1);
            this.scene.rotateDeg(90,1,0,0);
            piece.display(this.pieces[i],this.color);
            this.scene.popMatrix();
    
        }


    }

    else if(this.color == "black") {


        for(var i = 0; i < this.pieces.length; i++) {

            this.scene.pushMatrix();
            
            this.scene.translate(1+PIECE_WIDTH + i*0.45,BOARD_HEIGHT + PIECE_WIDTH,0.3);
            this.scene.rotateDeg(180,0,1,0);
            this.scene.rotateDeg(-90,0,0,1);
            this.scene.rotateDeg(90,1,0,0);
            piece.display(this.pieces[this.pieces.length-i-1],this.color);
            this.scene.popMatrix();
    
        }

    }


    


} 
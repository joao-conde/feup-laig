function MyBoard(scene) {

    console.log(scene);

    this.space = new MyRectangle(scene, 0, PIECE_WIDTH, PIECE_WIDTH, 0);

    // this.space = new MyRectangle(scene,0,200,200,0);

    this.scene = scene;

    this.spaceMaterial = new CGFappearance(this.scene);
    this.spaceMaterial.setAmbient(0.0, 0.0, 0.0, 0.5);
    this.spaceMaterial.setDiffuse(1.0, 1.0, 1.0, 0.0);
    this.spaceMaterial.setSpecular(0.0, 0.0, 0.0, 0.5);
    this.spaceMaterial.setEmission(0.0, 0.0, 0.0, 0.5);

    this.board = this.createEmptyBoard(25, 15);


}



MyBoard.prototype = Object.create(CGFobject.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.createEmptyBoard = function (width, height) {

    var result = [];

    for (var i = 0; i < height; i++) {

        var row = [];
        for (var j = 0; j < width; j++)
            row.push(EMPTY_SPACE);

        result.push(row);
    }

    return result;


}



MyBoard.prototype.updateBoard = function (board) {

    this.board = board;

}


MyBoard.prototype.display = function () {

    // this.scene.setActiveShader(this.scene.laigShader);

    var offsetX = BOARD_X / 2 - (this.board[0].length * 0.4) / 2;
    var offsetY = BOARD_WIDTH / 2 - this.board.length * 0.4 / 2 + 0.4;

    for (var i = 0; i < this.board.length; i++) {


        for (var j = 0; j < this.board[i].length; j++) {


            if (this.board[i][j][0][0] == -1) {

                this.scene.pushMatrix();

                this.scene.registerForPick(i * this.board[0].length + j + 40, this.space);

                this.scene.translate(offsetX + 0.4 * j, BOARD_HEIGHT, offsetY + 0.4 * i);
                this.scene.rotateDeg(-90, 1, 0, 0);

                this.spaceMaterial.apply();

                this.space.display();

                this.scene.popMatrix();

            }

        }

    }

    // this.scene.setActiveShader(this.scene.defaultShader);

    for (var i = 0; i < this.board.length; i++) {


        for (var j = 0; j < this.board[i].length; j++) {


            if (this.board[i][j][0][0] != -1) {

                this.scene.pushMatrix();

                var pieceColor = this.board[i][j][1][1] == 1 ? "white" : "black";

                this.scene.registerForPick(i * this.board[0].length + j + 40, this.space);

                this.scene.translate(offsetX + 0.4 * j, BOARD_HEIGHT, offsetY + 0.4 * i - PIECE_WIDTH);
                this.scene.rotateDeg(-90, 0, 1, 0);


                this.scene.game.piece.display(this.board[i][j], pieceColor);

                this.scene.popMatrix();

            }

        }



    }





}
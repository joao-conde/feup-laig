const DOT_WIDTH = 0.07;
const HEIGHT = 0.05;
const PIECE_WIDTH = 3 * DOT_WIDTH + 4 * DOT_WIDTH/2;



/**
 *
 MyVersatileCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


function MyNijuPiece(scene) {
	CGFobject.call(this,scene);

    var cpline1 = [[0,1,0,1],[1,1,0,1]];
    var cpline2 = [[0,0,0,1],[1,0,0,1]];

	this.scene = scene;

    this.patch = new MyRectangle(scene, 0, 1, 1, 0);
    
    this.whiteMaterial = new CGFappearance(this.scene);
    this.whiteMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);
    this.whiteMaterial.setDiffuse(0.9, 0.9, 0.9, 1.0);
    this.whiteMaterial.setSpecular(1, 1, 1, 1.0);
    this.whiteMaterial.setEmission(0.0, 0.0, 0.0, 1.0);

    this.blackMaterial = new CGFappearance(this.scene);
    this.blackMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);
    this.blackMaterial.setDiffuse(0.1, 0.1, 0.1, 1.0);
    this.blackMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.blackMaterial.setEmission(0.0, 0.0, 0.0, 1.0);

    this.dotMaterial = new CGFappearance(this.scene);
    this.dotMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);
    this.dotMaterial.setDiffuse(0.7, 0.0, 0.0, 1.0);
    this.dotMaterial.setSpecular(0.7, 0.0, 0.0, 1.0);
    this.dotMaterial.setEmission(0.0, 0.0, 0.0, 1.0);

    this.currentMaterial = null;

    this.height = HEIGHT;
    this.width = PIECE_WIDTH;

    console.log("Piece Width: " + PIECE_WIDTH);

    this.dot = new MyRectangle(scene, 0,DOT_WIDTH,DOT_WIDTH,0);

    // this.pieceIndexs = [

    //     [ {x:0,y:0}, {x:0,y:1}, {x:0,y:2}, {x:1,y:2}], // piece 1
    //     [ {x:0,y:0}, {x:0,y:1}, {x:0,y:2}, {x:2,y:2}], // piece 2
    //     [ {x:0,y:0}, {x:0,y:1}, {x:0,y:2}, {x:2,y:1}], // piece 3
    //     [ {x:0,y:0}, {x:0,y:1}, {x:0,y:2}, {x:2,y:0}], // piece 4
    //     [ {x:0,y:0}, {x:0,y:1}, {x:0,y:2}, {x:1,y:0}], // piece 5

    //     [ {x:0,y:0}, {x:0,y:1}, {x:1,y:2}, {x:2,y:2}], // piece 6
    //     [ {x:0,y:0}, {x:0,y:1}, {x:1,y:2}, {x:2,y:1}], // piece 7
    //     [ {x:0,y:0}, {x:0,y:1}, {x:1,y:2}, {x:2,y:0}], // piece 8
    //     [ {x:0,y:0}, {x:0,y:1}, {x:1,y:2}, {x:1,y:0}], // piece 9
    //     [ {x:0,y:0}, {x:0,y:1}, {x:2,y:1}, {x:2,y:2}], // piece 10

    //     [ {x:0,y:0}, {x:0,y:1}, {x:2,y:0}, {x:2,y:2}], // piece 11
    //     [ {x:0,y:0}, {x:0,y:1}, {x:1,y:0}, {x:2,y:2}], // piece 12
    //     [ {x:0,y:0}, {x:0,y:1}, {x:2,y:0}, {x:2,y:1}], // piece 13
    //     [ {x:0,y:0}, {x:0,y:1}, {x:1,y:0}, {x:2,y:1}], // piece 14
    //     [ {x:0,y:0}, {x:1,y:2}, {x:2,y:0}, {x:2,y:2}], // piece 15

    //     [ {x:0,y:0}, {x:1,y:0}, {x:1,y:2}, {x:2,y:2}], //piece 16
    //     [ {x:0,y:0}, {x:1,y:2}, {x:2,y:0}, {x:2,y:1}], //piece 17
    //     [ {x:0,y:0}, {x:1,y:0}, {x:1,y:2}, {x:2,y:1}], //piece 18
    //     [ {x:0,y:1}, {x:1,y:0}, {x:1,y:2}, {x:2,y:1}], //piece 19
    //     [ {x:0,y:0}, {x:0,y:2}, {x:2,y:0}, {x:2,y:2}]  //piece 20

    // ]

    
};

MyNijuPiece.prototype = Object.create(CGFobject.prototype);
MyNijuPiece.prototype.constructor = MyNijuPiece;

MyNijuPiece.prototype.display = function (pieceArray, colorTexture) {

    this.changeColor(colorTexture);
    
    this.scene.pushMatrix();
    this.scene.scale(this.width,HEIGHT,this.width);
	this.patch.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(this.width,0,0);
    this.scene.rotateDeg(90,0,1,0);
    this.scene.scale(this.width,HEIGHT,this.width);
	this.patch.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(0,0,-this.width);
    this.scene.rotateDeg(-90,0,1,0);
    this.scene.scale(this.width,HEIGHT,this.width);
	this.patch.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(this.width,0,-this.width);
    this.scene.rotateDeg(180,0,1,0);
    this.scene.scale(this.width,HEIGHT,this.width);
	this.patch.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(0,0,-this.width);
    this.scene.rotateDeg(90,1,0,0);  
    this.scene.scale(this.width,this.width,this.width);  
	this.patch.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    
    this.scene.translate(0,HEIGHT,0);
    this.scene.rotateDeg(-90,1,0,0);  
    this.scene.scale(this.width,this.width,this.width);  
	this.patch.display();
    this.scene.popMatrix();

    this.drawDots(pieceArray);

   

}

MyNijuPiece.prototype.changeColor = function(colorTexture) {

    if(colorTexture == 'white')
        this.currentMaterial = this.whiteMaterial;
    else if(colorTexture == 'black')
        this.currentMaterial = this.blackMaterial;
    
    this.currentMaterial.setTexture(null);
    this.currentMaterial.apply();

}


MyNijuPiece.prototype.drawDots = function(pieceArray) {


    for(var i = 0; i < pieceArray.length; i++) 
        for(var j = 0; j < pieceArray[i].length; j++) {

            if(i == 1 && j == 1)
                continue;

            if(pieceArray[i][j] == 1)
                this.drawDot({x:i, y:j});

        }
           


}

MyNijuPiece.prototype.drawDot = function(dotPos) {

    var row = dotPos.x;
    var column = dotPos.y;


    var dotSpace = DOT_WIDTH / 2;

    var dotSpacePlusDot = dotSpace + DOT_WIDTH;

    var translationX = dotSpace + row * dotSpacePlusDot;
    var translationZ = dotSpace + column * dotSpacePlusDot;

    this.scene.pushMatrix();

    this.scene.translate(translationX,HEIGHT+0.02,-translationZ);
    this.scene.rotateDeg(-90,1,0,0);
    
 

    this.dotMaterial.apply();
    this.dot.display();

    this.scene.popMatrix();


}   
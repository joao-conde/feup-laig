const HEIGHT = 0.2;
const WIDTH = 1;

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
    this.patch = new MyPatch(scene, [cpline1,cpline2],40,40);
    
    this.whiteMaterial = new CGFappearance(this.scene);
    this.whiteMaterial.setAmbient(1, 1, 1, 1);
    this.whiteMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.whiteMaterial.setSpecular(1, 1, 1, 1);
    this.whiteMaterial.setEmission(1, 1, 1, 1);

    this.blackMaterial = new CGFappearance(this.scene);
    this.blackMaterial.setAmbient(0, 0, 0, 1);
    this.blackMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
    this.blackMaterial.setSpecular(0.5, 0.5, 0.5, 1);
    this.blackMaterial.setEmission(0, 0, 0, 1);

    this.currentMaterial = null;

    this.textures = [new CGFtexture(this.scene,"./scenes/images/moon.jpg"), new CGFtexture(this.scene,"./scenes/images/solarpanel.jpg")];

    
};

MyNijuPiece.prototype = Object.create(CGFobject.prototype);
MyNijuPiece.prototype.constructor = MyNijuPiece;


MyNijuPiece.prototype.display = function (pieceTexture, colorTexture) {

    this.changeColor(colorTexture);
    
    this.scene.pushMatrix();
    this.scene.scale(WIDTH,HEIGHT,WIDTH);
	this.patch.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(WIDTH,0,0);
    this.scene.rotateDeg(90,0,1,0);
    this.scene.scale(WIDTH,HEIGHT,WIDTH);
	this.patch.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(0,0,-WIDTH);
    this.scene.rotateDeg(-90,0,1,0);
    this.scene.scale(WIDTH,HEIGHT,WIDTH);
	this.patch.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(WIDTH,0,-WIDTH);
    this.scene.rotateDeg(180,0,1,0);
    this.scene.scale(WIDTH,HEIGHT,WIDTH);
	this.patch.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(0,0,-WIDTH);
    this.scene.rotateDeg(90,1,0,0);    
	this.patch.display();
    this.scene.popMatrix();

    this.changePieceTexture(pieceTexture);

    this.scene.pushMatrix();
    this.scene.translate(0,HEIGHT,0);
    this.scene.rotateDeg(-90,1,0,0);    
	this.patch.display();
    this.scene.popMatrix();

}

MyNijuPiece.prototype.changeColor = function(colorTexture) {

    if(colorTexture == 'white')
        this.currentMaterial = this.whiteMaterial;
    else if(colorTexture == 'black')
        this.currentMaterial = this.blackMaterial;
    
    this.currentMaterial.setTexture(null);
    this.currentMaterial.apply();

}

MyNijuPiece.prototype.changePieceTexture = function(pieceTexture) {
    
    this.currentMaterial.setTexture(this.textures[pieceTexture]);
    this.currentMaterial.apply();
        
    
}
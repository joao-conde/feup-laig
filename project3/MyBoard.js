function MyBoard(scene) {

    console.log(scene);
    
    this.space = new MyRectangle(scene,0,PIECE_WIDTH,PIECE_WIDTH,0);

    // this.space = new MyRectangle(scene,0,200,200,0);

    this.scene = scene;

    this.dotMaterial = new CGFappearance(this.scene);
    this.dotMaterial.setAmbient(0.0, 0.0, 0.0, 0.5);
    this.dotMaterial.setDiffuse(1.0, 1.0, 1.0, 0.0);
    this.dotMaterial.setSpecular(0.0, 0.0, 0.0, 0.5);
    this.dotMaterial.setEmission(0.0, 0.0, 0.0, 0.5);



};

MyBoard.prototype = Object.create(CGFobject.prototype);
MyBoard.prototype.constructor = MyBoard;


MyBoard.prototype.display = function() {

    // this.scene.setActiveShader(this.scene.laigShader);


    for(var j = 2; j < 18; j++) {


        for(var i = 0; i < 27; i++) {

            this.scene.pushMatrix();

            
            this.scene.registerForPick((j-2) * 27 + i + 20, this.space);
        
            this.scene.translate(0.25+0.4*i,BOARD_HEIGHT,0.6+0.4*j);
            this.scene.rotateDeg(-90,1,0,0);

            this.dotMaterial.apply();
        
            this.space.display();

            this.scene.popMatrix();

           

        }

    

    }

    // this.scene.setActiveShader(this.scene.defaultShader);



}
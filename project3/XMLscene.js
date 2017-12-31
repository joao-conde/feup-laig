var DEGREE_TO_RAD = Math.PI / 180;
var PERIOD = 2500;

/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);

    this.zoom = 0.7;

    this.initialTime = 0;
    this.deltaTime = 0;

    this.interface = interface;
    this.lightValues = {};

    this.red = 0;
    this.green = 0;
    this.blue = 0;
    
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
    
    this.initCameras();

    this.enableTextures(true);
    
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);
    
    this.axis = new CGFaxis(this);


    this.selectables = [];

    this.laigShader = new CGFshader(this.gl, "shaders/laig_multiple_light-vertex.glsl", "shaders/laig_fragment.glsl");

    this.piece = new MyNijuPiece(this);

    this.gameInProgress = false;

    // this.rootID = "rootOrientalRoom";
    this.rootID = "rootOutside";
}

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
    var i = 0;
    // Lights index.
    
    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];
            
            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);
            
            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();
            
            this.lights[i].update();
            
            i++;
        }
    }
    
}

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function() {
    

    this.camera = new CGFcamera(0.6,0.1,500,vec3.fromValues(30, 15, 25),vec3.fromValues(0, 0, 0));

    this.initialCamera = this.camera;

    this.topDownBlack = new CGFcamera(0.7,0.1,500,vec3.fromValues(4, 18, 4),vec3.fromValues(5, 0, 5));
    this.topDownBlack.orbit(vec3.fromValues(1,0,0), -Math.PI/4);

    this.topDownWhite = new CGFcamera(0.7,0.1,500,vec3.fromValues(4, 18, 4),vec3.fromValues(5, 0, 5));
    this.topDownWhite.orbit(vec3.fromValues(1,0,0), -Math.PI/4);

    this.topDownWhite.orbit(vec3.fromValues(0,1,0), -Math.PI);

    this.cameras = [this.initialCamera, this.topDownWhite, this.topDownBlack];


}

/* Handler called when the graph is finally loaded. 
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function() 
{
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this,this.graph.referenceLength);
    
    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1], 
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);
    
    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);
    
    this.initLights();

    // Adds lights group.
    this.interface.addLightsGroup(this.graph.lights);
    // this.interface.addZoomController();
    this.interface.addGameModeSelector();
    this.interface.addDifficultySelector();
    this.interface.addUndoBtn();
    this.interface.addStartButton();
    this.interface.addCameraSelector();
    this.interface.addEnvironmentSelector();
    //this.interface.addShadersGroup();
}


XMLscene.prototype.updateEnvironment = function(){
    if(this.environment == 0)
        this.rootID = "rootOrientalRoom";
    
    if(this.environment == 1)
        this.rootID = "rootOutside";
}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
    //this.logPicking();
    // this.updateSelectedPiece();
	this.clearPickRegistration();
    
    // ---- BEGIN Background, camera and axis setup
    
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();

    if (this.graph.loadedOk) 
    {        

        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

		// Draw axis
		this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

        // Displays the scene.
        this.scale(this.zoom,this.zoom,this.zoom);
        this.graph.displayScene();

        this.setUpdatePeriod(200);

    }
	else
	{
		// Draw axis
		this.axis.display();
    }

    this.popMatrix();

    this.pushMatrix();

    if(this.game != undefined) {
        this.game.display();
    }

    

    this.popMatrix();
    
    // ---- END Background, camera and axis setup
    
}

XMLscene.prototype.rotateDeg = function(ang, x, y, z) {
    this.rotate(ang * Math.PI / 180, x, y, z);
}

XMLscene.prototype.update = function(currentTime) {

    for(animation in this.graph.animations) {
        this.graph.animations[animation].update(currentTime);
    }

    
    var factor = Math.abs(Math.sin(currentTime/PERIOD));

    var dic = {
        timeFactor:factor,
        red: this.red,
        green:this.green,
        blue:this.blue
    };

    this.laigShader.setUniformsValues(dic);

    this.updateSelectedPiece();
    // this.clearPickRegistration();
    
    if(this.game != undefined) {

        if(this.game.selectedPiece != -1)
            this.game.liftPieceAnimation.update(currentTime);
        
        // if(this.game.destinationRow != -1)
        //     this.game.movePieceAnimations[this.game.destinationRow][this.game.destinationColumn].update(currentTime);

    }

    
    if(this.gameInProgress == true)
        this.game.updateGameTime(currentTime);

    // if(this.cameraIndex != this.cameras.indexOf(this.camera))
        // this.camera = this.cameras[this.cameraIndex];
    


}


XMLscene.prototype.logPicking = function () {
    
    if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];				
					// console.log("Picked object: " + obj + ", with pick id " + customId);
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}
}

XMLscene.prototype.updateSelectedPiece = function () {
    
    if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
                    var customId = this.pickResults[i][1];
                    
                    var validSelection = false;

                    switch(this.game.gameMode) {

                        case 0:
                            if(this.game.currentPlayer == this.game.player1 && customId >= 0 && customId < 20)
                                validSelection = true;
                            else if(this.game.currentPlayer == this.game.player2 && customId >= 20 && customId < 40)
                                validSelection = true;
                        case '1':
                            if(this.game.currentPlayer == this.game.player1 && customId >= 0 && customId < 20)
                                validSelection = true;
                        default:
                    }



                    if(validSelection){

                        this.game.liftPieceAnimation.initialTime = 0;
                        this.game.selectedPiece = customId;
                        this.game.selectedPosition = -1;
                    }
                        
                    else {
                        if(this.game.selectedPiece != -1) {

                                var validPosition = true;

                                if(this.game.gameMode == 1)
                                    if(this.game.currentPlayer == this.game.player2)
                                        validPosition = false;
                                else if(this.game.gameMode == 2)
                                    validPosition = false;

                                if(validPosition && customId >= 40)
                                    this.game.selectedPosition = customId;
                                //TODO: Impedir que o humano escolha a posição do computador
                            
                        }
                    }

                    this.game.play();

				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}
}
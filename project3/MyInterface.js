 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor 
    CGFinterface.call(this);

    this.camDic = {
        "Initial":0,
        "Top":1,
        // "Black Side":2
    };


    this.environmentDic = {
        "Oriental Room": 0,
        "Outside": 1
    };

    this.playerNames = {
        player1: "Player1",
        player2: "Player2"
    };

    this.player1Name = this.playerNames.player1;
    this.player2Name = this.playerNames.player2;

}


MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui
    
    this.gui = new dat.GUI();

    
    return true;
};

MyInterface.prototype.addZoomController = function(){
        // add a group of controls (and open/expand by defult)
        var group = this.gui.addFolder("Transforms");
        group.open();
        var zoomController = group.add(this.scene, 'zoom', 0, 1).name("Zoom").step(0.01);
        zoomController.scene = this.scene;
    
        zoomController.onChange(function(newValue) {
    
            this.scene.zoom = newValue;
    
        });
    
        zoomController.setValue(0.7);
}

MyInterface.prototype.addGameModeSelector = function(){
    var group = this.gui.addFolder("Game modes");
    group.open();

    var gameModeDic = {
        "Human vs Human":0,
        "Human vs PC":1,
        "PC vs PC":2
    };

    this.scene.mode = 0;
    var gameModeCombo = group.add(this.scene, 'mode', gameModeDic).name("Mode");
}


MyInterface.prototype.addEnvironmentSelector = function(){
    var group = this.gui.addFolder("Environment");
    group.open();
    this.scene.environment = 0;
    var environmentSelector = group.add(this.scene, 'environment', this.environmentDic).name("Environment");
}

MyInterface.prototype.addDifficultySelector = function(){
    var group = this.gui.addFolder("Difficulties");
    group.open();

    var difDic = {
        "Easy":0,
        "Medium":1,
        "Hard":2
    };

    this.scene.difficulty = 0;
    var difficultyCombo = group.add(this.scene, 'difficulty', difDic).name("Difficulty");
}


MyInterface.prototype.addUndoBtn = function(){
    var undoBtn = { 'Undo Move':this.listenUndo.bind(this)};
    this.scene.undoBtn = 0;
    this.gui.add(undoBtn,'Undo Move');
}

MyInterface.prototype.listenUndo = function() {

    if(this.scene.game != undefined) 
        this.scene.game.undo();

}

MyInterface.prototype.addNames = function() {

    var group = this.gui.addFolder("Players");
    group.open();

    group.add(this.playerNames, "player1").onChange(this.handlerChangeNames.bind(this,1));

    group.add(this.playerNames, "player2").onChange(this.handlerChangeNames.bind(this,2));

}

MyInterface.prototype.handlerChangeNames = function(player,name) {

    if(player == 1)
        this.player1Name = name;
    else if(player == 2)
        this.player2Name = name;

}


MyInterface.prototype.addStartButton = function(){

    var startButton = { 'Start Game':interfaceStartGame.bind(this)};
    this.scene.startButton = 0;
    this.gui.add(startButton,'Start Game');
}

function interfaceStartGame(){ 

    if(this.scene.gameInProgress)
        return;

    var player1Name = this.player1Name;
    var player2Name = this.player2Name;


    this.scene.game = new MyGame(this.scene,player1Name,player2Name, this.scene.mode, this.scene.difficulty); 
    this.scene.gameInProgress = true;

    //DISABLE BUTTONS AND MODES


};

MyInterface.prototype.addCameraSelector = function(){
    var group = this.gui.addFolder("Cameras");
    this.scene.cameraIndex = 0;
    var cameraSelector = group.add(this.scene, 'cameraIndex', this.camDic).name("Cameras");
}

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {

    var group = this.gui.addFolder("Lights");
    group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }

}


 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor 
    CGFinterface.call(this);
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

    // add a group of controls (and open/expand by defult)
    var group = this.gui.addFolder("Transforms");
    group.open();
    var zoomController = group.add(this.scene, 'zoom', 0, 1).name("Zoom").step(0.01);
    zoomController.scene = this.scene;

    zoomController.onChange(function(newValue) {

        this.scene.zoom = newValue;

    });

    zoomController.setValue(0.7);

    return true;
};

MyInterface.prototype.addShadersGroup = function() {

    var groupShaders = this.gui.addFolder("Shaders");
    groupShaders.open();

    var shadersDic = {"none":null};

    for(var i = 0; i < this.scene.selectables.length; i++)
        shadersDic[this.scene.selectables[i]] = this.scene.selectables[i];

    
    
    var shadersCombo = this.gui.add(this.scene, 'selectables', shadersDic).name("Vertexes");

    shadersCombo.onChange((value) => {
        
        this.scene.graph.selectedNode = value;
        
    });

    shadersCombo.setValue(null);

    var redController = groupShaders.add(this.scene, 'red', 0, 1).name("Red").step(0.01);
    var greenController = groupShaders.add(this.scene, 'green', 0, 1).name("Green").step(0.1);
    var blueController = groupShaders.add(this.scene, 'blue', 0, 1).name("Blue").step(0.1);

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


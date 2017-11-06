function MyPatch(scene, controlVertexes,uDivs, vDivs) {
	
	CGFobject.call(this,scene);

	var degree1 = controlVertexes.length - 1;
	var degree2 = controlVertexes[0].length - 1;

	this.uDivs = uDivs;
	this.vDivs = vDivs;

	var getKnotsVector = function(degree) {

		var v = new Array();

	    for(var i = 0; i <= degree; i++) {
	        v.push(0);
	    }

	    for(var i = 0; i <= degree; i++) {
	        v.push(1);
    	}

    	return v;


	}

	var knots1 = getKnotsVector(degree1);
    var knots2 = getKnotsVector(degree2);

    var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlVertexes);

    
    getSurfacePoint = function(u,v) {

        return nurbsSurface.getPoint(u,v);

    };

    this.object = new CGFnurbsObject(scene, getSurfacePoint, this.uDivs, this.vDivs);
    
};

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor=MyPatch;

MyPatch.prototype.display = function() {


	this.object.display();



}
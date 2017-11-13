/**
 * MyAnimation
 * @constructor
 */

function MyAnimation() {};

//Abstrace methods
MyAnimation.prototype.calculateTranslation = function(){}

MyAnimation.prototype.calculateDistance = function(pointo,pointf) {

	var pointoX = pointo[0];
	var pointoY = pointo[1];
	var pointoZ = pointo[2];

	var pointfX = pointf[0];
	var pointfY = pointf[1];
	var pointfZ = pointf[2];

	return Math.sqrt(Math.pow((pointoX-pointfX),2) + 
					 Math.pow((pointoY-pointfY),2) + 
					 Math.pow((pointoZ-pointfZ),2));

}

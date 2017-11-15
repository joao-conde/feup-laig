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

	var acc = 0;
	for(var i = 0; i < pointo.length; i++)
		acc += Math.pow(pointo[i]-pointf[i],2);

	return Math.sqrt(acc);

}

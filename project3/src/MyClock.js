/**
 * MyClock
 * @constructor
 */
 function MyClock(scene) {

 	CGFobject.call(this,scene);
  this.clock = new MyCylinder(scene, 32, 1);

  this.clockHandSeconds = new MyClockHand(scene,1,0.1);
  this.clockHandMinutes = new MyClockHand(scene,1,0.2);
  this.clockHandHours = new MyClockHand(scene,0.5,0.2);

  this.secondsAngle = 0;
  this.minutesAngle = 0;
  this.hoursAngle = 0;

  this.daySummerTime = 0;

  this.clockTexture = new CGFappearance(scene);
  this.clockTexture.loadTexture("scenes/images/clock.png");
  this.clockTexture.setDiffuse(0.8, 0.8, 0.8, 1);
  this.clockTexture.setSpecular(0.2, 0.2, 0.2, 1);
  this.clockTexture.setShininess(2);

  this.clockHandTexture = new CGFappearance(scene);
  this.clockHandTexture.loadTexture("scenes/images/clock_hand.jpg");
  this.clockHandTexture.setDiffuse(0.5, 0.5, 0.5, 1);
  this.clockHandTexture.setSpecular(0, 0, 0, 1);
  this.clockHandTexture.setShininess(1);

  this.clockMaterial = new CGFappearance(this.scene);
  this.clockMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);
  this.clockMaterial.setDiffuse(0.1, 0.1, 0.9, 1.0);
  this.clockMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
  this.clockMaterial.setEmission(0.0, 0.0, 0.0, 1.0);


  this.disc = new MyDisc(scene);

 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function () {

  this.scene.pushMatrix();

  this.scene.translate(0,0,1.2);
    this.clockHandSeconds.setAngle(this.secondsAngle);
    this.clockHandTexture.apply();
    this.clockHandSeconds.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.scene.translate(0,0,1.2);
    this.clockHandMinutes.setAngle(this.minutesAngle);
    this.clockHandTexture.apply();
    this.clockHandMinutes.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.scene.translate(0,0,1.2);
    this.clockHandHours.setAngle(this.hoursAngle);
    this.clockHandTexture.apply();
    this.clockHandHours.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.scene.translate(0, 0, 1.05);
    this.clockTexture.apply();
    this.disc.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.clockMaterial.apply();
    this.clock.display();
  this.scene.popMatrix();

 }

 MyClock.prototype.update = function(currTime) {

  var deltaTempoMiliSegundos = currTime % (1000 * 60 * 60 * 12);
  var segundos = deltaTempoMiliSegundos / 1000;
  var segundo = segundos % 60;
  var minutos = segundos / 60;
  var minuto = minutos % 60;
  var hora = this.daySummerTime +  minutos / 60;

  this.secondsAngle = segundo * 6;
  this.minutesAngle = minuto * 6;
  this.hoursAngle = hora * 30;

 }

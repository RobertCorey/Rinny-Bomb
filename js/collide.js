var collideRules = function() {
        //hero collides
    game.physics.collide(hero, borders);
    game.physics.collide(hero, rocks);
    //lawyer collides
    game.physics.collide(lawyers, borders);
    game.physics.collide(lawyers, rocks);
    //missle collides
    game.physics.collide(missle, borders, missleCollideWall,null,this);
    game.physics.collide(missle, rocks, missleCollideRock, null, this);
    game.physics.collide(missle, lawyers, missleCollideLawyer, null, this);
    //lawyer missle collides 
    game.physics.collide(lawyerMissle,hero,missleHero,null,this);
    game.physics.collide(lawyerMissle, borders,eMissleCollide,null,this);
    game.physics.collide(lawyerMissle, rocks,eMissleCollide,null,this);
    game.physics.collide(missle,lawyerMissle,missleCollideLawyerMissle,null,this);
};

var missleCollideWall = function(missle,wall){
    missle.reset(-80,-80);
    rinny.reload();
};
var missleCollideRock = function(missle,rock){
    missle.reset(-80,-80);
    rinny.reload();
};
var eMissleCollide = function(missle,thingy){
    missle.reset(-30,-30);
};
var missleCollideLawyer = function(missle,lawyer){
    missle.reset(-80,-80);
    rinny.reload();
    var killMe = lawyers.getIndex(lawyer);
    lawyerUnits.splice(killMe,killMe);
    lawyer.destroy();
};
var missleCollideLawyerMissle = function(missle,lawyerMissle){
    missle.reset(-80,-80);
    lawyerMissle.reset(-30,-30);
    rinny.reload();
};
var lawyerCollideLawyer = function(lawyer1,lawyer2){
    lawyer1.body.velocity.y *= -1;
    lawyer1.body.velocity.x *= -1;
    lawyer2.body.velocity.y *= -1;
    lawyer2.body.velocity.x *= -1;
};
var missleHero = function(hero,missle){
    hero.reset(20,20);
    missle.reset(-30,-30);
};
var lawyerHero = function(lawyer,hero){
    hero.reset(20,20);
};
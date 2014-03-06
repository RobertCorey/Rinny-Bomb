var collideRules = function() {
        //hero collides
    game.physics.collide(hero, borders);
    game.physics.collide(hero, rocks);
    //lawyer collides
    game.physics.collide(lawyers.unitGroup, borders);
    game.physics.collide(lawyers.unitGroup, rocks);
    game.physics.collide(lawyers.unitGroup, hero,lawyerHero,null,this);
    //missle collides
    game.physics.collide(missle, borders, missleCollideWall,null,this);
    game.physics.collide(missle, rocks, missleCollideRock, null, this);
    game.physics.collide(missle, lawyers.unitGroup, missleCollideLawyer, null, this);
    game.physics.collide(missle, lawyers.missleGroup, missleCollideLawyerMissle, null, this);
    //enemy missle collides
    game.physics.collide(lawyers.missleGroup,borders,eMissleCollide,null,this);
    game.physics.collide(lawyers.missleGroup,rocks,eMissleCollide,null,this);
    game.physics.collide(lawyers.missleGroup,hero,missleHero,null,this);
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
    lawyers.killOne(lawyer);
    score += 10;
    rinny.reload();
};
var missleCollideLawyerMissle = function(missle,lawyerMissle){
    missle.reset(-80,-80);
    lawyerMissle.reset(-30,-30);
    rinny.reload();
};
var missleHero = function(hero,missle){
    killHero();
    missle.reset(-30,-30);
    rinnyDeath.play();
};
var lawyerHero = function(hero,lawyer){
    killHero();
    rinnyDeath.play();
};

function killHero () {
    hero.reset(20,20);
    titleScreen.content = "Score: " + score + "\nS to Restart";
    score = 0;
    test = false;
}
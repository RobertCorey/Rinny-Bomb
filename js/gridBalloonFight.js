
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('title','assets/title.png');
    game.load.image('tile1','assets/square1.png');
    game.load.image('tile2','assets/square2.png');
    game.load.image('evil','assets/evil.png');
    game.load.image('hero','assets/hero.png');
    game.load.image('missle','assets/missle.png');
    game.load.image('rock','assets/rock.png');
    game.load.image('border','assets/border.png');
    game.load.image('oobv','assets/oobv.png');
    game.load.image('oobh','assets/oobh.png');
    game.load.image('emissle','assets/emissle.png');
}
var rocks;
var missle;
var hero;
var villian;
var borders;
var cursors;
var fps;
var rinny;
var fireButton;
var startButton;
var lawyers;
var lawyerUnits = [];
var lawyerMissle;
var lawyerMissles = [];
var titleSprite;
function create() {
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //Number of enemies to spawn
    var LAWYERS = 8;
    //draw border
    drawBackground('tile1','tile2');
    //rocks can be clipped around
    rocks = game.add.group();
    drawRocks('rock',rocks);
    //Game borders
    borders = game.add.group();
    border = borders.create(0,0,'oobh');
    border.body.immovable = true;
    border = borders.create(0,20,'oobv');
    border.body.immovable = true;
    border = borders.create(780,20,'oobv');
    border.body.immovable = true;
    border = borders.create(0,540,'oobh');
    border.body.immovable = true;
    drawBorderPath('border',20,20);
    //create the missle for the hero
    missle = game.add.sprite(-80,-80,'missle');
    //create the missles for the lawyers
    lawyerMissle = game.add.group();
    for (var i = 0; i < LAWYERS; i++) {
        lawyerMissles[i] = lawyerMissle.create(-30,-30,'emissle');
    }
    //create our hero
    hero = game.add.sprite(20,20,'hero');
    rinny = new Unit(hero,missle);
    //create all the badguys
    lawyers = game.add.group();
    for (i = 0; i < LAWYERS; i++) {
        var xPos = 20;
        var alien = lawyers.create(xPos + (i * 80), 500,'evil');
        lawyerUnits[i] = new Unit(alien,lawyerMissles[i]);
    }
    cursors = game.input.keyboard.createCursorKeys();
    fps = game.add.text(100,570,'FPS: 0',{font: '24px Arial',fill:'#96F140'});
}
var test;
function update() {
        playGame();
}

function playGame () {
    collideRules();
    rinny.movement();
    rinny.weapons();
    var tick = (game.time.time % 1000) % 2;
    if(tick >= 0.5 && tick <= 0.6){
        for (var i = 0; i < lawyerUnits.length; i++) {
            lawyerUnits[i].AiMove();
        }
    }
    for (var j = 0; j < lawyerUnits.length; j++) {
        lawyerUnits[j].AiFire(j,lawyerMissles,rinny.name.x,rinny.name.y);
    }
    fps.content = "fps: " + game.time.fps + " hero x: " + rinny.name.x + " hero y: " + rinny.name.y;
}

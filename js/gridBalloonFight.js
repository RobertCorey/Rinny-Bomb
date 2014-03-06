
var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

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
    game.load.audio('fire','assets/fire.mp3');
    game.load.audio('wreck','assets/wreckspeed.mp3');
    game.load.audio('death','assets/rinnyDeath.mp3');
}
var rocks;
var missle;
var hero;
var borders;
var cursors;
var fps;
var rinny;
var fireButton;
var startButton;
var lawyers;
var titleScreen;
var score = 0;
var fire;
var wreck;
var rinnyDeath;
var sound = true;
function create() {
    //sound effects
    fire = game.add.audio('fire');
    wreck = game.add.audio('wreck');
    rinnyDeath = game.add.audio('death');
    //Number of enemies to spawn
    //draw border
    drawBackground('tile1','tile2');
    //rocks can be clipped around
    rocks = game.add.group();
    drawRocks('rock',rocks);
    //Game borders
    borders = game.add.group();
    drawBorder(borders);
    //outside path
    drawBorderPath('border',20,20);
    //create the missle for the hero
    missle = game.add.sprite(-80,-80,'missle');
    //create our hero
    hero = game.add.sprite(20,20,'hero');
    rinny = new Unit(hero,missle,fire);
    //create all the badguys
    lawyers = new EnemyHandler(lawyers,game);
    lawyers.spawn(16, 10);
    //input
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    startButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
    fps = game.add.text(100,570,'FPS: 0',{font: '24px Arial',fill:'#96F140'});
    titleScreen = game.add.text(200,150,'',{font: '72px Arial',fill:'black'});
}
var test = false;
var highScore = 0;
function update() {
    if (test === false) {
        titleScreen.content = "Rinny Bomber\nPress S key";
        lawyers.killAll();
        if(startButton.justPressed()){
            wreck.play();
            titleScreen.content = "";
            test = true;
            lawyers.freeAll();
        }
    }
    playGame();
    if(lawyers.isClear()){
        test = false;
    }
}

function playGame () {
    collideRules();
    rinny.movement();
    rinny.weapons();
    lawyers.move(100);
    lawyers.weaponsOnline(rinny);
    fps.content = "FPS: " + game.time.fps + " Score: " + score + " High Score: " +highScore;
    if (score > highScore) {
        highScore = score;
    }
}


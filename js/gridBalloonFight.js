var drawBackground = function(tile1,tile2){
    var flipper = 0;
    var x = 40;
    var y = 40;

    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 9; j++) {
            if (flipper % 2 === 0) {
                game.add.sprite(x,y,tile1);
            }else{
                game.add.sprite(x,y,tile2);
            }
            flipper += 1;
            x += 80;
        }
        x = 40;
        y += 80;
    }
};
var drawRocks = function(rock,group){
    var x = 60;
    var y = 60;
    var rockInstance;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 9; j++) {  
            rockInstance = group.create(x,y,rock);
            rockInstance.body.immovable = true;
            x += 80;
        }
        x = 60;
        y += 80;
    }
};
var drawBorderPath = function(path,x,y){
        for (var j = 0; j < 37; j++) {
            x += 20;
            game.add.sprite(x,y,path);
            
        }
        for (var i = 0; i < 25; i++) {
            y += 20;
            game.add.sprite(x,y,path);
        }
        for (var k = 0; k < 37; k++) {
            x -= 20;
            game.add.sprite(x,y,path);
            
        }
        for (var r = 0; r < 25; r++) {
            y -= 20;
            game.add.sprite(x,y,path);
        }
};
var fastVertical = function(player,direction){
    var relPos = player.x % 80;
    var moveX;
    var moveY;
    if (relPos >= 20 && relPos <= 40) {
        moveX = player.x - relPos + 20;
        if(direction === 1 ){
            moveY = player.y + 5;
        }else{
            moveY = player.y - 5;
        }
        player.reset(moveX,moveY);
        if (player.y < 20) {
            player.reset(player.x,20);
        }
        if (player.y > 500) {
            player.reset(player.x,500);
        }
        return true;
    }else if(relPos >= 0 && relPos <= 20){
        moveX = player.x + relPos;
        if(direction === 1){
            moveY = player.y + 5;
        }else if(direction === 0){
            moveY = player.y - 5;
        }
        player.reset(moveX,moveY);
        if (player.y < 20) {
            player.reset(player.x,20);
        }
        if (player.y > 500) {
            player.reset(player.x,500);
        }
        return true;
    }
};
var fastHorizontal = function(player,direction){
    var relPos = player.y % 80;
    var moveX;
    var moveY;
    if (relPos >= 20 && relPos <= 40) {
        moveX = player.y - relPos + 20;
        if(direction === 1 ){
            moveY = player.x + 5;
        }else{
            moveY = player.x - 5;
        }
        player.reset(moveX,moveY);
        if (player.x < 20) {
            player.reset(player.y,20);
        }
        if (player.x > 500) {
            player.reset(player.y,500);
        }
        return true;
    }else if(relPos >= 0 && relPos <= 20){
        moveX = player.y + relPos;
        if(direction === 1){
            moveY = player.x + 5;
        }else if(direction === 0){
            moveY = player.x - 5;
        }
        player.reset(moveX,moveY);
        if (player.x < 20) {
            player.reset(player.y,20);
        }
        if (player.x > 500) {
            player.reset(player.y,500);
        }
        return true;
    }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('tile1','assets/square1.png');
    game.load.image('tile2','assets/square2.png');
    game.load.image('evil','assets/evil.png');
    game.load.image('hero','assets/hero.png');
    game.load.image('missle','assets/missle.png');
    game.load.image('rock','assets/rock.png');
    game.load.image('border','assets/border.png');
    game.load.image('oobv','assets/oobv.png');
    game.load.image('oobh','assets/oobh.png');

}
var rocks;
var hero;
var villian;
var borders;
var cursors;
var fps;
function create() {
    //draw border

    drawBackground('tile1','tile2');
    //rocks can be clipped around
    rocks = game.add.group();
    drawRocks('rock',rocks);
    //borders can't be clipped around
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
    //create our hero
    hero = game.add.sprite(20,20,'hero');

    cursors = game.input.keyboard.createCursorKeys();
    fps = game.add.text(100,570,'FPS: 0',{font: '24px Arial',fill:'#96F140'});
}

function update() {
    game.physics.collide(hero, borders);
    game.physics.collide(hero, rocks);
    //stop player if not moving
    hero.body.velocity.x = 0;
    hero.body.velocity.y = 0;
    if (cursors.left.isDown)
    {
        hero.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        hero.body.velocity.x = 200;
    }else if (cursors.up.isDown)
    {
        if (!fastVertical(hero,0)) {
        hero.body.velocity.y = 200;
        }
    }else if (cursors.down.isDown)
    {
        if (!fastVertical(hero,1)) {
        hero.body.velocity.y = 200;
        }
    }
    fps.content = 'FPS :' + /*game.time.fps*/ hero.x + " " + hero.y;
}
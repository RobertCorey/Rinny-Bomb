//draws the field of battle
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

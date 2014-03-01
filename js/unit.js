function Unit(spriteObject){
    this.name = spriteObject;
    this.direction = 'down';
}
//Movement 
//If a unit clips out of bounds teleport them back in
Unit.prototype.teleport = function(){
    var xPos = this.name.x;
    var yPos = this.name.y;
    if (xPos < 20) {
        xPos = 20;
    }else if(xPos > 740){
        xPos = 740;
    }
    if (yPos < 20) {
        yPos = 20;
    }else if(yPos > 500){
        yPos = 500;
    }
    if (xPos !== this.name.x || yPos !== this.name.y) {
        this.name.reset(xPos,yPos);
        return true;
    } 
};
Unit.prototype.clipV = function(direction) {
    var relPos = this.name.x % 80;
    var newXPos;
    var newYPos;
    if (direction === 'down') {
        newYPos = this.name.y + 5;
    }else{
       newYPos = this.name.y - 5;
    }
    if (relPos >= 0 && relPos <= 40) {
        newXPos = this.name.x - relPos + 20;
        this.name.reset(newXPos,newYPos);
        this.teleport(this.name);
        return true;
    }
};

Unit.prototype.clipH = function(direction) {
    var relPos = this.name.y % 80;
    var newXPos;
    var newYPos;
    if (direction === "left") {
        newXPos = this.name.x - 5;
    }else{
        newXPos = this.name.x + 5;
    }
    if (relPos >= 0 && relPos <= 40) {
        newYPos = this.name.y - relPos +20;
        this.name.reset(newXPos,newYPos);
        this.teleport(this.name);
        return true;
    }
};

Unit.prototype.movement = function() {
    hero.body.velocity.x = 0;
    hero.body.velocity.y = 0;
    if (cursors.left.isDown) {
        this.direction = 'left';
        if (!this.clipH(this.direction)){
        this.name.body.velocity.x = -200;
        }
    }
    else if (cursors.right.isDown) {
        this.direction = 'right';
        if (!this.clipH(this.direction)){
            this.name.body.velocity.x = 200;
        }
    }
    else if (cursors.up.isDown) {
        this.direction = 'up';
        if (!this.clipV(this.direction)){
            this.name.body.velocity.y = 200;  
        }
    }
    else if (cursors.down.isDown) {
        this.direction = 'down';
        if (!this.clipV(this.direction)){
            this.name.body.velocity.y = -200;  
        }
    }
};

Unit.prototype.weapons = function() {
    if (fireButton.isDown) {
        var temp = game.add.sprite(this.name.x,this.name.y,'missle');
        temp.body.velocity.x = 500;
    }
};
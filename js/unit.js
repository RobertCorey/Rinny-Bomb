function Unit(spriteObject,weapon,fireSound){
    this.name = spriteObject;
    this.missle = weapon;
    this.direction = 'down';
    this.ammo = 1;
    this.trap = false;
    this.fireSound = fireSound;
}
Unit.prototype.setTrapTrue = function() {
    this.trap = true;
};
Unit.prototype.setTrapFalse = function() {
    this.trap = false;
};
//Movement 
//If a unit clips out of bounds teleport them back in
Unit.prototype.teleport = function(){
    var xPos = this.name.x;
    var yPos = this.name.y;
    if(this.trap === false){
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
    }else{
        if(xPos < 840 || xPos > 920 || yPos < 40 || yPos > 200){
            this.name.reset(880,120);
        }
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
        this.name.body.velocity.x = -300;
        }
    }
    else if (cursors.right.isDown) {
        this.direction = 'right';
        if (!this.clipH(this.direction)){
            this.name.body.velocity.x = 300;
        }
    }
    else if (cursors.up.isDown) {
        this.direction = 'up';
        if (!this.clipV(this.direction)){
            this.name.body.velocity.y = 300;  
        }
    }
    else if (cursors.down.isDown) {
        this.direction = 'down';
        if (!this.clipV(this.direction)){
            this.name.body.velocity.y = -300;  
        }
    }
};
//Weapon Fire For Hero 
Unit.prototype.weapons = function() {
    if (fireButton.isDown && this.ammo > 0) {
        this.fire();
        this.fireSound.play();
    }
};
Unit.prototype.fire = function(){
    var MISSLE_SPEED = 500;
    this.missle.reset(this.name.x + 10 ,this.name.y + 10);
    this.ammo -= 1;
    switch(this.direction){
        case "left":
            this.missle.body.velocity.x = -MISSLE_SPEED;
            break;
        case "right":
            this.missle.body.velocity.x = MISSLE_SPEED;
            break;
        case "up":
            this.missle.body.velocity.y = -MISSLE_SPEED;
            break;
        case "down":
            this.missle.body.velocity.y = MISSLE_SPEED;
            break;
    }
};
Unit.prototype.reload = function(){
    this.ammo += 1;
};

Unit.prototype.validMove = function() {
    var moves = [false,false,false,false];
    if (this.name.x % 80 >= 0 && this.name.x % 80 <= 40 && this.name.y > 25) {
        moves[0] = true;
    }
    if (this.name.x % 80 >= 0 && this.name.x % 80 <= 40 && this.name.y < 495) {
        moves[2] = true;
    }
    if (this.name.y % 80 >= 0 && this.name.y % 80 <= 40 && this.name.x > 25) {
        moves[3] = true;
    }
    if (this.name.y % 80 >= 0 && this.name.y % 80 <= 40 && this.name.x < 725) {
        moves[1] = true;
    }
    var randomnumber = false;
    //
    var failSafe = 0;
    do{
         randomnumber=Math.floor(Math.random()*4);
         failSafe += 1;
         if (failSafe > 20) {
            break;
         }
    }while(!moves[randomnumber]);
    if (failSafe < 20) {
    return randomnumber;
    }else{
        this.name.reset(880,120);
    }

};

Unit.prototype.AiMove = function() {
    this.name.body.velocity.x = 0;
    this.name.body.velocity.y = 0;
    var move = this.validMove();
        if (move === 3) {
        this.direction = 'left';
        this.clipH(this.direction);
        this.name.body.velocity.x = -300;

    }
    else if (move === 1) {
        this.direction = 'right';
        this.clipH(this.direction);
        this.name.body.velocity.x = 300;
    }
    else if (move === 0) {
        this.direction = 'up';
        this.clipV(this.direction);
        this.name.body.velocity.y = -300;  

    }
    else if (move == 2) {
        this.direction = 'down';
        this.clipV(this.direction);
        this.name.body.velocity.y = 300; 

    }
};

Unit.prototype.AiFire = function(missleArray,targetX,targetY) {
    if(this.ammo < 1){
        this.tryReload();
    }
    if (this.ammo > 0 && this.trap === false) {
        switch(this.direction){
            case 'left':
                if (this.name.y == targetY && this.name.x > targetX) {
                    this.fire();
                }
                break;
            case 'right':
                if (this.name.y == targetY && this.name.x < targetX) {
                    this.fire();
                }
                break;
            case 'up':
                if (this.name.x == targetX && this.name.y > targetY) {
                    this.fire();
                }
                break;
            case 'down':
                if (this.name.x == targetX && this.name.y < targetY) {
                    this.fire();
                }
                break;
        }
    }
};

Unit.prototype.tryReload = function() {
    if (this.missle.x === -30) {
        this.ammo += 1;
    }
};
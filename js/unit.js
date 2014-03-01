function Unit(spriteObject){
    this.name = spriteObject;
}
//Movement 
//If a unit clips out of bounds teleport them back in
Unit.prototype.teleport = function(){
    var xPos = this.name.x;
    var yPos = this.name.y;
    if (xPos < 20) {
        xPos = 20;
    }else if(xPos > 780){
        xPos = 780;
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
    if (relPos >= 20 && relPos <= 40) {
        newXPos = this.name.x - relPos + 20;
        this.name.reset(newXPos,newYPos);
        this.teleport(this.name);
        return true;
    }else if(relPos >= 0 && relPos <=20){
        newXPos = this.name.x + relPos;
        this.name.reset(newXPos,newYPos);
        this.teleport(this.name);
        return true;
    }
};

Unit.prototype.movement = function() {
    hero.body.velocity.x = 0;
    hero.body.velocity.y = 0;
    if (cursors.left.isDown) {
        
    }
    else if (cursors.right.isDown) {
        //
    }
    else if (cursors.up.isDown) {
        if (!this.clipV('up')){
            this.name.body.velocity.y = 200;  
        }
    }
    else if (cursors.down.isDown) {
        if (!this.clipV('down')){
            this.name.body.velocity.y = -200;  
        }
    }
};
function EnemyHandler(name,game){
	this.name = name;
	this.unitGroup = game.add.group();
	this.missleGroup = game.add.group();
	this.unitArray = [];
	this.missleArray = [];
}

EnemyHandler.prototype.createMissle = function(count) {
	for (var i = 0; i < count; i++) {
		this.missleArray[i] = this.missleGroup.create(-30,-30,'emissle');
	}
};

EnemyHandler.prototype.spawn = function(numGuys,distanceApart) {
	this.createMissle(numGuys);
    var xPos = 20;
	for (var i = 0; i < numGuys; i++) {
		var temp = this.unitGroup.create(xPos + (i * distanceApart), 500,'evil');
		this.unitArray[i] = new Unit(temp,this.missleArray[i]);
	}
};

EnemyHandler.prototype.move = function(interval){
	var tick = (game.time.time % 1000);
    if(tick >= 0.0 && tick <= (0.0 + interval)){
		for (var i = 0; i < this.unitArray.length; i++) {
			this.unitArray[i].AiMove();
		}
    }
};

EnemyHandler.prototype.weaponsOnline = function(target){
    for (var j = 0; j < this.unitArray.length; j++) {
        this.unitArray[j].AiFire(this.missleArray,target.name.x,target.name.y);
    }
};

EnemyHandler.prototype.killAll = function() {
    this.killBullets();
	for (var i = 0; i < this.unitArray.length; i++) {
        this.unitArray[i].setTrapTrue();
        this.unitArray[i].name.reset(880,120);
	}
	return true;
};
EnemyHandler.prototype.killBullets = function() {
    for (var i = 0; i < this.missleArray.length; i++) {
        this.missleArray[i].reset(-30,-30);
        this.missleArray[i].body.velocity.x = 0;
        this.missleArray[i].body.velocity.y = 0;
    }
};
EnemyHandler.prototype.freeAll = function() {
    var spacing = this.unitArray.length;
        spacing = 800 / spacing;
        spacing = Math.floor(spacing);
    for (var i = 0; i < this.unitArray.length; i++) {
        this.unitArray[i].setTrapFalse();
        this.unitArray[i].name.reset(20 + (i *spacing),500);
    }
    return true;
};
EnemyHandler.prototype.killOne = function(sprite) {
	index = this.killOneHelper(sprite);
    this.unitArray[index].setTrapTrue();
	this.unitArray[index].name.reset(880,120);
	return true;
};

EnemyHandler.prototype.killOneHelper = function(sprite) {
    return this.unitGroup.getIndex(sprite);
};

EnemyHandler.prototype.isClear = function() {
    for (var i = 0; i < this.unitArray.length; i++) {
        if (this.unitArray[i].trap === false) {
            return false;
        }
    }
    return true;
};
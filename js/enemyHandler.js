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
		var temp = this.group.create(xPos + (i * distanceApart), 500,'evil');
		this.unitArray[i] = new Unit(temp,lawyerMissles[i]);
	}
};

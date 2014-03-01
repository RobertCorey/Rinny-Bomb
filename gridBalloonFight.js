var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('tile1','assets/square1.png');
    game.load.image('tile2','assets/square2.png');
    game.load.image('evil','assets/evil.png');
    game.load.image('hero','assets/hero.png');
    game.load.image('missle','assets/missle.png');
    game.load.image('rock','assets/rock.png');

}

function create() {
    console.log(game.width);
    console.log(game.height);
}

function update() {
}
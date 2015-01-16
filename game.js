//configure height and width of game window
var gameHeight = 600,
    gameWidth = 800;

var player;
var wall;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, '', {
    preload: preload, create: create, update: update });
var cursor;

//prototype for the player

function Player(sprite) {
    this.sprite = sprite;


}

function Wall (sprite) {
    this.sprite = sprite;
}


function preload () {
    game.load.image('player', 'assets/images/player.png');
    game.load.image('enemy', 'assets/images/enemy.png');
    game.load.image('ally', 'assets/images/ally.png');
    game.load.image('wall', 'assets/images/wall.png');


}


function create() {
    

    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#2d2d2d';
    player = new Player(game.add.sprite(gameWidth-32, gameHeight -32, 'player'));
    wall = new Wall(game.add.sprite(gameWidth-64, gameHeight-64, 'wall'));
    game.physics.arcade.enable(player.sprite);
    game.physics.arcade.enable(wall.sprite);
    cursor = game.input.keyboard.createCursorKeys();
    player.sprite.body.collideWorldBounds = true;
    
}

function update() {
    player.sprite.body.velocity.x = 0;
    player.sprite.body.velocity.y = 0;
    movePlayer();
    
}

function movePlayer() {
    if (cursor.left.isDown) {
        player.sprite.body.velocity.x = -150;
        //player.animations.play('left');
    }
    else if (cursor.right.isDown) {
        player.sprite.body.velocity.x = 150;
        //player.sprite.animations.play('right');
    }
    else if (cursor.up.isDown) {
        //Move up the screen
        player.sprite.body.velocity.y = -150;
    }
    else if (cursor.down.isDown) {
        //Move down the screen
        player.sprite.body.velocity.y = 150;
    }
    
}

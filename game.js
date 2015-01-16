//configure height and width of game window
var gameHeight = 600,
    gameWidth = 800;

var player;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, '', {
    preload: preload, create: create, update: update });
var cursor;
function preload () {
    game.load.image('player', 'assets/images/player.png');
    game.load.image('enemy', 'assets/images/enemy.png');
    game.load.image('ally', 'assets/images/ally.png');


}


function create() {
    

    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#2d2d2d';
    player = game.add.sprite(gameWidth -32,gameHeight - 32, 'player');
    game.physics.arcade.enable(player);
    cursor = game.input.keyboard.createCursorKeys();
    
}

function update() {
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    movePlayer();
    
}

function movePlayer() {
    if (cursor.left.isDown) {
        player.body.velocity.x = -150;
        //player.animations.play('left');
    }
    else if (cursor.right.isDown) {
        player.body.velocity.x = 150;
        //player.animations.play('right');
    }
    else if (cursor.up.isDown) {
        //Move up the screen
        player.body.velocity.y = -150;
    }
    else if (cursor.down.isDown) {
        //Move down the screen
        player.body.velocity.y = 150;
    }
    
}

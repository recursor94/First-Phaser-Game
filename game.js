//configure height and width of game window
var gameHeight = 600,
    gameWidth = 800;

var player;
var walls;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, '', {
    preload: preload, create: create, update: update });
var cursor;
var characters;
var enemies;

//prototype for the player

function Player(spritePath) {

    this.preload = function() {
	game.load.image('player', spritePath);
	

    };

    this.create = function() {
	player = game.add.sprite(game.width-170, game.height -32, 'player');
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
    };

    this.update = function() {
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;
	movePlayer();    
    };
    


}

function Walls (spritePath) {
    this.preload = function () {
	    game.load.image('wall', spritePath);
    };

    this.create = function () {

    };
}


function preload () {

    game.load.image('ally', 'assets/images/ally.png');
    game.load.image('wall', 'assets/images/wall.png');
    game.load.image('enemy', 'assets/images/enemy.png');


}


function create() {
    

    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#2d2d2d';

    walls = game.add.group();
    walls.enableBody=true;
    walls.physicsBodyType = Phaser.Physics.ARCADE;
    var brick = walls.create(game.width-200,0, 'wall');
    brick.scale.setTo(1,24);
    brick.body.immovable=true;
    


    cursor = game.input.keyboard.createCursorKeys();


    //enemy code
    
    enemies =  game.add.group();
    enemies.enableBody=true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    var enemy = enemies.create(game.width-500, game.height-200, 'enemy');
    
    
}

function update() {
    game.physics.arcade.collide(player, wall);
    game.physics.arcade.collide(enemies, wall);
    //player.collideWorldBounds = true;





    
}

function movePlayer() {
  var velocityModifier = 500;
   if (cursor.up.isDown) {
        //Move up the screen
        player.body.velocity.y = -velocityModifier;
    }
    else if (cursor.down.isDown) {
        //Move down the screen
        player.body.velocity.y = velocityModifier;
    }
    
}

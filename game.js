


//configure height and width of game window
var gameHeight = 600,
    gameWidth = 800;

var player;
var walls;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, '', {
    preload: preload, create: create, update: update });
var cursor;
var enemyEntities;
var level = 0;
var player;
//prototype for the player

function Player(spritePath) {
    this.sprite;

    this.preload = function() {
	game.load.image('player', spritePath);
	

    };

    this.create = function() {
	this.sprite = game.add.sprite(game.width-170, game.height -32, 'player');
	game.physics.arcade.enable(this.sprite);
	player.sprite.body.collideWorldBounds = true;
    };

    this.update = function() {
	this.sprite.body.velocity.x = 0;
	this.sprite.body.velocity.y = 0;
	movePlayer();    
    };
    


};
function enemies (spritePath) {
    
    this.group = game.add.group();
    this.preload = function() {
	game.load.image('enemy', spritePath);
    }

    this.create = function() {
	this.group.createMultiple(10, 'enemy');
	this.group.enableBody=true;
	this.group.physicsBodyType = Phaser.Physics.ARCADE;


    }

    this.update = function () {
	var enemy = this.group.getFirstExists(false);
	enemy.reset(0,0);
	
    }

}

function Walls (spritePath) {
    this.preload = function () {
	    game.load.image('wall', spritePath);
    };

    this.create = function () {

    };
}


function preload () {
    player= new Player('assets/images/player.png');
    enemyEntities = new enemy('assets/images/enemy.png')
    
    player.preload();

    game.load.image('ally', 'assets/images/ally.png');
    game.load.image('wall', 'assets/images/wall.png');
    game.load.image('enemy', 'assets/images/enemy.png');


}


function create() {
    player.create();
    enemyEntities.create();
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
    
 
    
    
}

function update() {
    game.physics.arcade.collide(player.sprite, walls);
    game.physics.arcade.collide(enemyEntities, walls);

    player.update();
    enemyEntities.update();
    
}

function movePlayer() {
  var velocityModifier = 500;
   if (cursor.up.isDown) {
        //Move up the screen
        player.sprite.body.velocity.y = -velocityModifier;
    }
    else if (cursor.down.isDown) {
        //Move down the screen
        player.sprite.body.velocity.y = velocityModifier;
    }
    
}


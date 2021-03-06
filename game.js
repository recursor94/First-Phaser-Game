


//configure height and width of game window
var gameHeight = 600,
    gameWidth = 800;
var walls;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, '', {
    preload: preload, create: create, update: update });
var cursor;
var enemyEntities;
var level = 0;
var player;
var bullets;
//prototype for the player

function Player(spritePath) {
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

    this.fireBullets = function(bulletGroup) {
	console.log("Bullet Group: " + bulletGroup);
	var bull = bulletGroup.getFirstExists(false); //having problems with uniquenames considering name of prototype functions
	console.log(bull)  ;
	game.physics.enable(bull, Phaser.Physics.ARCADE, true);//otherwise doesn't have body'
	bull.reset(this.sprite.x, this.sprite.y);
	bull.velocity.x = -25;
		

    };
    


}
function enemies (spritePath) {
    
    this.group = game.add.group();
    this.velocity = 100;
    this.preload = function() {
	game.load.image('enemy', spritePath);
    };

    this.create = function() {
	this.group.createMultiple(10, 'enemy');
	this.group.enableBody=true;
	this.group.physicsBodyType = Phaser.Physics.ARCADE; //doesn't give individual sprites  bodies for some reason'

    };

    this.update = function () {
	var enemy = this.group.getFirstExists(false);
	if(enemy !=null) {
	    enemy.reset(0, game.rnd.integerInRange(20, 550));
	    game.physics.enable(enemy, Phaser.Physics.ARCADE, true);//otherwise doesn't have body'
	    enemy.body.velocity.x = this.velocity;
	    //game.physics.arcade.collide(enemy, walls);
	}
	
    };

}

function bullet(spritePath) {
    this.group = game.add.group();
    this.preload = function () {

	game.load.image('bullet',spritePath);
	
    };
    this.create = function () {
	this.group.createMultiple('bullet', 5);
	this.group.enableBody = true;
	this.group.physicsBodyType = Phaser.Physics.ARCADE; //doesn't give individual sprites  bodies for some reason'
	this.group.setAll('outOfBoundsKill', true);
	this.group.setAll('checkWorldBounds', true);

    };

    this.update = function () {
	//var bullet = this.group.getFirstExists(false);
	
	
	
    };

}




function preload () {
    player= new Player('assets/images/player.png');
    enemyEntities = new enemies('assets/images/enemy.png');
    bullets = new bullet('assets/images/bullet.png');
    
    player.preload();
    enemyEntities.preload();
    game.load.image('wall', 'assets/images/wall.png');


}


function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = 'c9ddd9';
    player.create();
    enemyEntities.create();
    bullets.create();

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
    game.physics.arcade.collide(enemyEntities.group, walls);

    player.update();
    enemyEntities.update();
    if(cursor.left.isDown) {
	console.log(bullets.group);
	player.fireBullets(bullets.group);
    }


    
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


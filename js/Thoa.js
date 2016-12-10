var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('homework', 'assets/homework.png');
	game.load.image('test', 'assets/test.png');
    game.load.spritesheet('baddie', 'assets/betty.png', 48, 48, 16);
	

}

var player;
var platforms;
var cursors;

var homeworks;
var tests;
var score = 0;
var scoreText;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'baddie');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [1, 5, 9, 13], 16, true);
	player.animations.add('right', [3, 7, 11, 15], 16, true);

    //  Finally some homeworks and tests to collect
    homeworks = game.add.group();
	tests = game.add.group();

    //  We will enable physics for any homework and test that is created in this group
    homeworks.enableBody = true;
	tests.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a homework inside of the 'homeworks' group
        var homework = homeworks.create(i * 70, 0, 'homework');
		
		//	Create a test inside of the 'tests' group
		var test = tests.create(i * 70, 0, 'test');

        //  Let gravity do its thing
        homework.body.gravity.y = 300;
		test.body.gravity.y = 300;

        //  This just gives each homework a slightly random bounce value
        homework.body.bounce.y = 0.7 + Math.random() * 0.2;
		
		//  This just gives each test a slightly random bounce value
        test.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {

    //  Collide the player, the homeworks and the tests with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(homeworks, platforms);
	game.physics.arcade.collide(tests, platforms);

    //  Checks to see if the player overlaps with any of the homeworks, if he does call the collectHomework function
    game.physics.arcade.overlap(player, homeworks, collectHomework, null, this);
	
	//  Checks to see if the player overlaps with any of the tests, if he does call the collectTest function
    game.physics.arcade.overlap(player, tests, collectTest, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}

function collectHomework (player, homework) {
    
    // Removes the homework from the screen
    homework.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}

function collectTest (player, test) {
    
    // Removes the test from the screen
    test.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}
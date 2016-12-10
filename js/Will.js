var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/school.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('homework', 'assets/homework.png');
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32, 4);
	game.load.image('test','assets/test.png');

}

var player;
var platforms;
var cursors;

var homeworks;
var score = 0;
var scoreText;

//CHANGE
var tests;

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
    player.animations.add('left', [0, 1], 4, true);
	player.animations.add('right', [2, 3], 4, true);

    //CHANGE : moved hw

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
	
	
	//  The first parameter is how long to wait before the event fires. In this case 5 seconds (you could pass in 2000 as the value as well.)
    //  The second parameter is how many times the event will run in total. Here we'll run it 2 times.
    //  The next two parameters are the function to call ('createBall') and the context under which that will happen.

    //  Once the event has been called 2 times it will never be called again.

    game.time.events.repeat(Phaser.Timer.SECOND * 5, 2, createHomework, this);
	
	//  AT 15 SECOND MARK
	//  Here we'll create a basic timed event. This is a one-off event, it won't repeat or loop:
    //  The first parameter is how long to wait before the event fires. In this case 15 seconds (you could pass in 4000 as the value as well.)
    //  The next parameter is the function to call ('halfTime') and finally the context under which that will happen.

    game.time.events.add(Phaser.Timer.SECOND * 15, halfTime, this);
	
	//  AT 29 SECONDS
	game.time.events.add(Phaser.Timer.SECOND * 29, createTest, this);
}

function update() {

    //  Collide the player and the homeworks with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(homeworks, platforms);

    //  Checks to see if the player overlaps with any of the homeworks, if he does call the collecthomework function
    game.physics.arcade.overlap(player, homeworks, collectHomework, null, this);

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

function createHomework() {

	//  Finally some homeworks to collect
    homeworks = game.add.group();

    //  We will enable physics for any homework that is created in this group
    homeworks.enableBody = true;
	
	var homeworkFall = (Math.round(Math.random()*10) + 1)*70; // Falls between 70 and width - 70 px
	
	var homework = homeworks.create(homeworkFall,0,'homework');
	homework.body.gravity.y = 300;

	/*
    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a homeworks inside of the 'homework' group
        var homework = homeworks.create(i * 70, 0, 'homework');

        //  Let gravity do its thing
        homework.body.gravity.y = 300;

        //  This just gives each homeworks a slightly random bounce value
        homework.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
	*/

}

function createTest() {

	//  Finally some homeworks to collect
    tests = game.add.group();

    //  We will enable physics for any homework that is created in this group
    tests.enableBody = true;
	
	var testFall = (Math.round(Math.random()*10) + 1)*70; // Falls between 70 and width - 70 px
	
	var aTest = tests.create(testFall,0,'test');
	aTest.body.gravity.y = 300; // TODO: make it fall faster

	/*
    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a homeworks inside of the 'homework' group
        var homework = homeworks.create(i * 70, 0, 'homework');

        //  Let gravity do its thing
        homework.body.gravity.y = 300;

        //  This just gives each homeworks a slightly random bounce value
        homework.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
	*/

}


function halfTime(){
	createTest();
	game.time.events.repeat(Phaser.Timer.SECOND * 5, 2, createHomework, this);
}

function render() {

    game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

}

function collectHomework (player, homework) {
    
    // Removes the homework from the screen
    homework.kill();

    //  Add and update the score
    score += 15;
    scoreText.text = 'Score: ' + score;

}

function collectTest (player, aTest) {
    
    // Removes the homework from the screen
    aTest.kill();

    //  Add and update the score
    score += 20;
    scoreText.text = 'Score: ' + score;

}

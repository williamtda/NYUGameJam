var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('homework', 'assets/homework.png');
   // game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32, 4);
	game.load.image('test','assets/test.png');
	 game.load.spritesheet('betty', 'assets/betty.png', 48, 48, 16);
	 
	  game.load.image('menu', 'assets/blackbox.jpeg', 360, 360);

}

var player;
var platforms;
var cursors;

var homework;
var score = 0;
var scoreText;

//CHANGE
var aTest;

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
    player = game.add.sprite(32, game.world.height - 150, 'betty');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
 player.animations.add('left', [1, 5, 9, 13], 16, true);
	player.animations.add('right', [3, 7, 11, 15], 16, true);

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
	
	game.time.events.add(Phaser.Timer.SECOND * 5, endGame, this); // Testing purposes only
}

function endGame() {
	// When the pause button is pressed, we pause the game
        game.paused = true;

        // Then add the menu
        var menu = game.add.sprite(w/2, h/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);
		var endMessage = "GRADE:"+score;
		if (score < 60){
			endMessage = endMessage+ " FAIL!!"; 
		}
		var endText = game.add.text(w/2, h/2, endMessage,{ font: '30px Arial', fill: '#fff' });
		

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        var choiseLabel = game.add.text(w/2, h-150, 'Click here to restart', { font: '30px Arial', fill: '#fff' });
        //choiseLabel.anchor.setTo(0.5, 0.5);
		
		
		
		// Calculate the corners of the menu
            var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                y1 = h/2 - 180/2, y2 = h/2 + 180/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
				
            }
            else{
               location.reload();
            }
}

function update() {

    //  Collide the player and the homework with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(homework, platforms);

    //  Checks to see if the player overlaps with any of the homeworks, if he does call the collecthomework function
    game.physics.arcade.overlap(player, homework, collectHomework, null, this);

	// CHANGE: tests
	game.physics.arcade.overlap(player, aTest, collectTest, null, this);

	
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
	try {
		homework.kill();
	} catch (err){
		
	}
	
	var homeworkFall = Math.random()*10*70 + 1; // Falls between 70 and width - 70 px
	// The player and its settings
    homework = game.add.sprite(homeworkFall, 0, 'homework');

    //  We need to enable physics on the player
    game.physics.arcade.enable(homework);
	
	homework.body.gravity.y = 300;

}

function createTest() {
	try {
		aTest.kill();
	} catch (err){
		
	}

	var testFall = Math.random()*10*70 + 1; // Falls between 70 and width - 70 px
	// The player and its settings
    aTest = game.add.sprite(testFall, 0, 'test');

    //  We need to enable physics on the player
    game.physics.arcade.enable(aTest);
	
	aTest.body.gravity.y = 300;
	
	/*
	//  Finally some tests to collect
    tests = game.add.group();

    //  We will enable physics for any test that is created in this group
    tests.enableBody = true;
	
	var testFall = Math.random()*10*70 + 1; // Falls between 70 and width - 70 px
	
	var aTest = tests.create(testFall,0,'test');
	aTest.body.gravity.y = 100; // TODO: make it fall slower
	*/

}

function halfTime(homework){
	
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

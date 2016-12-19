var SurviveSchool = SurviveSchool || {};

//loading the game assets
SurviveSchool.Preload = function(){};

SurviveSchool.Preload.prototype = {
	preload: function (){
		//load game assets
		this.load.image('sky', 'assets/sky.png');
		this.load.image('ground', 'assets/ground.png');
		this.load.image('platform','assets/platform.png')'
		this.load.image('homework', 'assets/homework.png');
		//this.load.spritesheet('baddie', 'assets/baddie.png', 32, 32, 4);
		this.load.image('test','assets/test.png');
		this.load.spritesheet('betty', 'assets/betty.png', 48, 48, 16);
		this.load.image('school', 'assets/school.png');
		this.load.image('menu', 'assets/blackbox.png', 360, 200);
		 
		//add sound
		this.load.audio('music', 'assets/audio/How_It_Began.mp3'); 
	},
	create: function(){
		this.state.start('MainMenu');
	}
	
}
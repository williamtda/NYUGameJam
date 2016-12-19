var SurviveSchool = SurviveSchool || {};

SurviveSchool.Boot = function(){};

// https://gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/

SurviveSchool.Boot.prototype = {
	create: function() {
		
		//scaling options
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 240;
		this.scale.minHeight = 170;
		this.scale.maxWidth = 2880;
		this.scale.maxHeight = 1920;
		
		//have the game centered horizontally
		this.scale.pageAlightnHorizontally = true;
		
		//screen size will be set automatically
		this.scale.setScreenSize(true);
		
		//physics system for movement
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.state.start('Preload');
	}
	
}
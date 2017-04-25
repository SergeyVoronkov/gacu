var Finish = cc.Node.extend({
	ctor: function () {
		this._super();
		this.addChild(new cc.LayerColor(cc.color(0, 0, 0, 100)), cc.winSize);

		var logo = new cc.Sprite(res.finish);
		logo.setPosition(cc.visibleRect.center);



		this.addChild(logo);

		var playGame = new cc.MenuItemImage(res.playagain, res.playagain, this.onStart, this);

		playGame.setPosition(0, -235);
		playGame.scale = 0.7;

		var menu = new cc.Menu(playGame);
		this.addChild(menu, 6);

		cc.audioEngine.playMusic('res/sound.mp3');
	},
	onStart: function () {
		cc.director.runScene(new GameScene(false));
	}
});


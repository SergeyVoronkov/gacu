var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
		var bg = new cc.Sprite(res.startBacground);
		bg.setPosition(cc.visibleRect.center);
		this.addChild(bg);

		var size = cc.winSize;

		var playGame = new cc.MenuItemImage(res.playButton, res.playButton, this.onStart, this);

		playGame.setPosition(-70, 160);
		playGame.setRotation(-5);
		playGame.runAction(cc.repeatForever(cc.sequence(
				cc.rotateBy(0.15, 10, 0),
				cc.rotateBy(0.3, -20, 0),
				cc.rotateBy(0.15, 10, 0),
				//	cc.blink(0.5, 5),
				cc.delayTime(1)
				)));

		var menu = new cc.Menu(playGame);
		this.addChild(menu, 6);
    },
	onStart: function () {
		cc.director.runScene(new GameScene(true));
	}
});


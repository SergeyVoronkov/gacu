var Clod = cc.Node.extend({
	volume: 0,
	diameter: 0, //
	radius: 0, // 
	ctor: function () {
		this._super();
		this.supper = false;
		this.light = new cc.Sprite(res.lightclod);
		this.light.visible = false;
		this.sprite = new cc.Sprite(res.Clod_png);
		this.addChild(this.light);
		this.addChild(this.sprite);
		this.setVolume(this.volume);
		this.scheduleUpdate();
		this.a1 = 0;
		this.a2 = 0;
		this.items = [];
		for (var i = 0; i < 20; ++i) {
			var item = new cc.Sprite(util.randomArr(res.small01));
			this.addItem(item);
			item.y = Math.sqrt(this.radius * this.radius - item.x * item.x);
		}
	},
	setVolume: function (volume) {
		this.volume = Math.min(1, Math.max(volume, 0));

		this.diameter = util.fromto(sizeObject.small * 1.33, sizeObject.big * 1.3, this.volume);
		this.radius = this.diameter / 2;
		if (this.diameter > sizeObject.middle * 1.3) {
			if (!this.supper) {
				this.supper = true;
				this.light.visible = true;
				this.light.runAction(cc.blink(0.6, 10));
			}
		} else {
			if (this.supper) {
				this.supper = false;
				this.light.stopAllActions();
				this.light.visible = false;
			}
		}
		this.sprite.setScale(this.diameter / this.sprite.texture.width);
		this.light.setScale(this.diameter / this.sprite.texture.width);
		//util.renderRect(this, this.sprite.getBoundingBox(), 'clod');
	},
	addItem: function (item) {
		item.x = util.randomIntRange(-this.radius, this.radius);
		item.y = 0;

		this.items.push(item);
		this.addChild(item);
	},
	update: function (dt) {

		/*this.a1 += (100 * dt) % Math.PI;
		 this.a2 += (100 * dt) % Math.PI;*/
		var r = this.radius * this.radius;
		for (var i = 0; i < this.items.length; ++i) {
			var item = this.items[i];
			if (item.x > this.radius || item.x < -this.radius) {
				item.x = util.randomIntRange(-this.radius, this.radius);
			} else {
				item.y += this.vel.y * dt * 0.5;
				var y = Math.sqrt(r - item.x * item.x);
				if (item.y > y) {
					item.y = -y;
				}
				if (item.y < -y) {
					item.y = y;
				}
				item.scale = util.fromto(1, 0.5, Math.abs(item.x / this.radius)) * util.fromto(1, 0.5, Math.abs(item.y / this.radius));
			}
		}
	}
});


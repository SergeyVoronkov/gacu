var GameObject = cc.Node.extend({
	ctor: function (type, texture, size) {
		this._super();
		this.type = type;
		this.sprite = new cc.Sprite(texture);
		this.size = size;
		this.sprite.setScale(size / this.sprite.texture.width);
		this.addChild(this.sprite);
		this.setContentSize(this.sprite.getContentSize());
	},
	getBoundingBox: function () {
		var w = this.sprite.texture.width * this.sprite.scale;
		var h = this.sprite.texture.height * this.sprite.scale;
		return cc.rect(this.x - w / 2, this.y - h / 2, w, h);
	},
	setPosition: function (x, y) {
		cc.Node.prototype.setPosition.call(this, x, y);
		this.sprite.setFlippedX(this.x > cc.visibleRect.center.x);
	},
	setCollected: function (v) {
		this.collected = v;
		if (this.collected) {
			//this.sprite.color = cc.color(5, 0, 0, 100);
		}
	}
});



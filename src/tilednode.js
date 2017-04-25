/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TileNode = cc.Node.extend({
	ctor: function (tiles) {
		this._super();
		this.tiles = tiles;
		this.size = (new cc.Sprite(this.tiles[0])).getContentSize();
		this.tilesIndex = [];
		this.maxTile = Math.floor(cc.visibleRect.height / this.size.height) + 1;
		this.pool = [];
		var tile = null;
		for (var c = 0; c < 2; ++c) {
			for (var s = 0; s < this.tiles.length; ++s) {
				tile = new cc.Sprite(this.tiles[s]);
				tile.setAnchorPoint(0.5, 0);
				tile.setVisible(false);
				this.addChild(tile);
				this.pool.push(tile);
			}
		}
		for (var i = 0; i < this.maxTile; ++i) {
			this.renderTile(i);
		}
		this.removed = true;
	},
	getTopY: function () {
		return Math.max.apply(Math, (this.children.map(function (item) {
			return item.y;
		}))) + this.size.height;
	},
	getNewTile: function () {
		var tile = null;
		if (this.pool.length == 0) {
			tile = new cc.Sprite(util.randomArr(this.tiles));
			tile.setAnchorPoint(0.5, 0);
			this.addChild(tile);
		} else {
			var i = Math.floor(Math.random() * this.pool.length);
			tile = this.pool[i];
			this.pool.splice(i, 1);
			tile.setVisible(true);
		}
		return tile;
	},
	renderTile: function (i) {
		if (!this.tilesIndex[i]) {
			this.tilesIndex[i] = this.getNewTile();
			this.tilesIndex[i].setPosition(0, this.size.height * i);
		}
	},
	removeTile: function (i) {
		if (this.tilesIndex[i]) {
			this.tilesIndex[i].visible = false;
			this.pool.push(this.tilesIndex[i]);
			this.tilesIndex[i] = null;
		}
	},
	setPosition: function (x, y) {
		cc.Node.prototype.setPosition.call(this, x, y);
		if (!this.changeLevel) {
			var i = Math.ceil(y / this.size.height) * -1;
			if (i >= 0) {
				this.renderTile(i + this.maxTile);
			}
		}
		if (this.removed) {
			this.removeTile(i - 2);
		}
	}
});
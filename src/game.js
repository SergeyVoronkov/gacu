var Game = cc.Layer.extend({
	vel: cc.p(600, 800),
	speed: 800,
	speedScale: 1.3,
	aсс: 1500,
	level: 1,
	ctor: function (helped) {
		this._super();
		this.clod = new Clod();
		this.clod.speed = this.speed;
		this.clod.aсс = this.aсс;
		this.clod.vel = this.vel;
		this.helped = helped ? 1 : 0;
		this.addChild(this.clod, 3);
		this.clod.setPosition(cc.visibleRect.bottom.x, cc.visibleRect.bottom.y + 50);
		this.scheduleUpdate();
		this.startLine = cc.visibleRect.top.y + cc.visibleRect.height;
		this.left = cc.visibleRect.left.x; // Левая граница
		this.right = cc.visibleRect.right.x; // Правая граница
		this.background = new TileNode([
			res.background01_1,
			res.background01_2,
			res.background01_3,
		]);
		this.addChild(this.background, 1);
		this.background.setPosition(cc.visibleRect.center.x, 0)

		this.letlayer = new cc.Layer();
		this.addChild(this.letlayer, 2);

		this.distance = new cc.LabelTTF('0', 'arial', 50);
		this.distance.visible = false;
		this.distance.setPosition(cc.visibleRect.center.x, cc.visibleRect.topLeft.y - 50);
		this.addChild(this.distance, 5);

		this.objects = [];

		this.smallObjects = [];

		this.bigObject = cc.visibleRect.width / 3;
		this.smallObject = cc.visibleRect.width / 10;

		this.distanceBigObject = 0;
		this.distanceMiddleObject = 0;
		this.distanceSmallObject = 0;


		this.lastAddBigSize = 0;
		this.lastAddSmallSize = 0;

		this.amount = 0;
		this.maxAmount = scoreToUpLevel[this.level];

		this.sizes = sizeObject;

		this.progressBackground = new cc.Sprite(res.proggressbg);
		this.progressBackground.setPosition(cc.visibleRect.right.x - this.progressBackground.width, cc.visibleRect.right.y);
		this.addChild(this.progressBackground, 100);

		this.progress = new cc.Sprite(res.proggress);
		this.progress.setPosition(cc.visibleRect.right.x - this.progressBackground.width / 2, 0);
		this.addChild(this.progress, 101);

		this.setProgress(0);
		/*node3d = new Node3D();
		node3d.setPosition(cc.visibleRect.center);
		this.addChild(node3d, 20);*/
	},
	finish: function () {
		this.progressBackground.visible = false;
		this.progress.visible = false;
		this.unscheduleUpdate();
		this.clod.unscheduleUpdate();
		this.addChild(new Finish(), 200);
	},
	help: function (type, items, helped) {
		this.unscheduleUpdate();
		this.clod.unscheduleUpdate();

		var text = helpTexts[type];

		var helparrows = items.map(function (item) {
			var helparrow = new cc.Sprite(res.helparrow);

			helparrow.setPosition(item.x, item.y - item.height / 2 - 10);

			helparrow.runAction(cc.repeatForever(cc.sequence(
					cc.moveBy(0.3, 0, -10),
					cc.moveBy(0.3, 0, 10)
					)));

			var label = new cc.LabelTTF(text, 'arial', 40);
			label.setAnchorPoint(0.5, 1);
			label.setPosition(helparrow.width / 2, -10)
			label.boundingWidth = 400;
			label.textAlign = cc.TEXT_ALIGNMENT_CENTER;

			this.addChild(helparrow, 100);
			helparrow.addChild(label, 100);
			return helparrow;
		}, this);

		var self = this;
		this.scheduleOnce(function () {
			helparrows.forEach(function (helparrow) {

				helparrow.removeFromParent();
			})
			self.scheduleUpdate();
			self.clod.scheduleUpdate();

			self.helped = helped;
		}, 2);
	},
	setProgress: function (v) {
		this.progress.y = util.fromto(cc.visibleRect.right.y - this.progressBackground.height / 2 + 16, cc.visibleRect.right.y + this.progressBackground.height / 2 - 16, v)
	},
	onEnter: function () {
		cc.Layer.prototype.onEnter.call(this);
		this.keys = {};
		var self = this;
		this._keyboardListener = cc.EventListener.create({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed: function (code, event) {
				self.keys[code] = true;
			},
			onKeyReleased: function (code, event) {
				self.keys[code] = false;
			}
		});
		cc.eventManager.addListener(this._keyboardListener, this);
	},
	onExit: function () {
		cc.Layer.prototype.onExit.call(this);
		if (this._keyboardListener) {
			cc.eventManager.removeListeners(this._keyboardListener);
		}
	},
	update: function (dt) {
		if (this.level > 3)
			return;

		var dir = 0;
		if (this.keys[cc.KEY.left]) {
			dir = -1;
		} else if (this.keys[cc.KEY.right]) {
			dir = 1;
		}
		if (this.clod.vel.y < this.clod.speed) {
			this.clod.vel.y += this.clod.aсс * dt;
		}
		//if (this.clod.vel.y > 0) 
		{
			this.clod.x += this.clod.vel.x * dir * dt;
			if (this.left + this.clod.radius > this.clod.x) {
				this.clod.x = this.left + this.clod.radius;
			} else if (this.right - this.clod.radius < this.clod.x) {
				this.clod.x = this.right - this.clod.radius;
			}
		}
		var vel = this.clod.vel.y * dt;
		if (this.nextLevel) {
			this.nextLevel.setPosition(cc.visibleRect.center.x, (this.nextLevel.y - vel));
			if (this.nextLevel.y < 0) {
				//this.nextLevel.changeLevel = false;
				this.background.removeFromParent();
				this.background = this.nextLevel;
				this.nextLevel = null;
			}
		}


		var distance = -(this.background.y - vel);
		this.background.setPosition(cc.visibleRect.center.x, -distance);
		if (this.background.scale > 1) {
			this.background.scale -= this.speedScale * dt;
			if (this.background.scale <= 1) {
				this.background.scale = 1;
				this.background.removed = true;
				this.distanceBigObject = 0;
				this.amount = 0;
			}
			this.clod.setVolume(this.clod.volume - this.speedScale * dt);
		}

		var item, colide = false;
		for (var i = this.objects.length; i-- > 0; ) {
			item = this.objects[i];
			item.y -= vel;
			item.scale = 1 / this.background.scale;
			item.setCollected(this.clod.diameter > item.size * 1.3);

			if (this.helped == 2 && (item.type == 'big' || item.type == 'middle') && item.y < cc.visibleRect.height * 2 / 3) {
				this.helped = 0;
				this.help('big', this.objects.filter(function (item) {
					return (item.type == 'big' || item.type == 'middle');
				}), 3);
			} else if (this.helped == 1 && item.type == 'small' && item.y < cc.visibleRect.height * 2 / 3) {
				this.helped = 0;
				this.help('small', this.objects.filter(function (item) {
					return (item.type == 'small');
				}), 2);
			} else if (this.helped == 3 && item.type == 'middle' && item.y < cc.visibleRect.height * 2 / 3 && item.y > cc.visibleRect.height / 3 && item.collected) {
				this.helped = 0;
				this.help('middle', this.objects.filter(function (item) {
					return (item.type == 'middle');
				}), 4);
			}
			if (item.y < -cc.visibleRect.height) {
				this.letlayer.removeChild(item);
				this.objects.splice(i, 1);
			} else if (item && !item.removed) {
				var box = item.getBoundingBox();
				box.x -= this.clod.radius * 0.9;
				box.y -= this.clod.radius * 0.9;
				box.width += this.clod.diameter * 0.9;
				box.height += this.clod.diameter * 0.9;
				if (cc.rectContainsPoint(box, this.clod)) {
					if (item.collected) {
						this.objects.splice(i, 1);
						this.collect(item);
						this.clod.vel.y -= 300 * scores[item.type] * (1 - this.clod.volume);
					} else {
						colide = item;
					}
				}
			}
		}
		if (colide) {
			this.damage();
			this.clod.vel.y = -500;
		}
		if (this.nextLevel) {
			return;
		}
		//this.distance.setString((Math.round(distance / 1000)).toString());

		if (distance > this.distanceBigObject) {
			var cfg = this.getConfigLevel();
			if (cfg.big) {

				var obj = this.createObject('big');
				var pos = util.randomArr([this.left + obj.size / 2, this.right - obj.size / 2]);
				obj.setPosition(pos, this.startLine);

				this.distanceBigObject = distance + util.randomIntRange(cfg.big.min, cfg.big.max);

				if (cfg.small) {
					this.distanceSmallObject = distance + util.randomIntRange(cfg.small.min, cfg.small.max);
				} else {
					this.distanceSmallObject = Infinity;
				}
				if (cfg.small) {
					this.addSmallPoint(obj.getPosition());
				}
			} else {
				this.distanceBigObject = distance + 1000;
			}
			if (cfg.middle) {
				var max = Math.min(this.distanceBigObject - (distance + cfg.middle.max), cfg.middle.max);
				if (max > cfg.middle.min) {
					this.distanceMiddleObject = distance + util.randomIntRange(cfg.middle.min, max);
				}
			} else {
				this.distanceMiddleObject = Infinity;
			}
		} else if (distance > this.distanceMiddleObject) {
			var cfg = this.getConfigLevel();
			if (cfg.middle) {
				if (this.distanceBigObject - distance > cfg.middle.min) {
					var middle = this.createObject('middle');
					middle.setPosition(util.randomIntRange(this.left, this.right), this.startLine);
					if (cfg.small) {
						this.addSmallPoint(middle.getPosition());
					}
				}

				var max = Math.min(this.distanceBigObject - (distance + cfg.middle.max), cfg.middle.max);
				if (max > cfg.middle.min) {
					this.distanceMiddleObject = distance + util.randomIntRange(cfg.middle.min, max);
				} else {
					this.distanceMiddleObject = distance + 1000;
				}
				if (cfg.small) {
					this.distanceSmallObject = distance + util.randomIntRange(cfg.small.min, cfg.small.max);
				} else {
					this.distanceSmallObject = distance + 500;
				}
			} else {
				this.distanceMiddleObject = distance + 1000;
			}

		} else if (distance > this.distanceSmallObject) {
			/*if (this.smallObjects.length > 2) {
				var cfg = this.getConfigLevel();
				if (cfg.small) {
					var small = this.createObject('small');
					small.setPosition(this.smallObjects[2], this.startLine);
					this.distanceSmallObject = distance + util.randomIntRange(cfg.small.min, cfg.small.max);
				} else {
					this.distanceSmallObject = distance + 500;
				}
			}*/
		}

	},
	addSmallPoint: function (point) {
		var small = this.createObject('small');
		if ((point.x - this.left) > (this.right - point.x)) {
			small.setPosition(this.left + (point.x - this.left) / 2, this.startLine);
		} else {
			small.setPosition(point.x + ((this.right - point.x)) / 2, this.startLine);
		}
		/*this.smallObjects.push({x: small.x, y: small.y});
		if (this.smallObjects.length > 4) {
			this.smallObjects.shift();
		}
		if (this.smallObjects.length == 4) {
			for (var t = 0; t < 1; t += 0.1) {
				var small = this.createObject('small');
				small.setPosition(cc.cardinalSplineAt(this.smallObjects[3], this.smallObjects[2], this.smallObjects[1], this.smallObjects[0], 0, t));
			}
		}*/
		if (this.lastSmallObject) {
			var x = this.lastSmallObject.x, y = this.lastSmallObject.y;
			var count = 3;
			var dx = (small.x - this.lastSmallObject.x) / count;
			var dy = (small.y - this.lastSmallObject.y) / count;
			x += dx;
			y += dy;
			for (var i = 1; i < count - 1; ++i) {
				x += dx;
				y += dy;
				var small = this.createObject('small');
				small.setPosition(x, y);
			}
		}
		this.lastSmallObject = small;
	},
	createObject: function (size) {
		var obj = new GameObject(size, util.randomArr(res[size + '0' + this.level]), this.sizes[size]);
		this.letlayer.addChild(obj);
		this.objects.push(obj);
		return obj;
	},
	collect: function (item) {
		this.letlayer.removeChild(item, false);
		this.clod.addItem(item);
		if (!this.nextLevel) {
			this.addAmount(scores[item.type] || 1);
		}
	},
	addAmount: function (value) {
		this.amount += value;
		this.distance.setString(Math.round(this.amount).toString());
		this.clod.setVolume(this.amount / this.maxAmount);
		this.setProgress((this.level - 1) / 3 + this.clod.volume / 3);
		if (this.amount > this.maxAmount) {
			this.changeLavel();
		}
	},
	damage: function () {
		var value = this.maxAmount * this.clod.volume * damage;
		if (this.clod.items.length > 20) {
			var count = Math.round(this.clod.items.length * damage);
			for (var j = 0; j < count; ++j) {
				var i = util.randomIntRange(0, this.clod.items.length - 1);
				var item = this.clod.items[i];
				this.clod.items.splice(i, 1);
				item.removeFromParent(false);
				this.addChild(item, 2);
				item.setPosition(this.clod);
				item.runAction(cc.sequence(
						cc.jumpTo(0.6, util.randomIntRange(0, cc.visibleRect.width), -10, util.randomIntRange(50, 200), 1),
						cc.removeSelf()
						));
			}
		}

		this.amount -= value;
		this.distance.setString(Math.round(this.amount).toString());
		this.clod.setVolume(this.amount / this.maxAmount);
	},
	changeLavel: function () {
		if (this.nextLevel) {
			return;
		}
		this.background.changeLevel = true;
		this.level += 1;
		if (this.level > 3) {
			this.finish();
			return;
		}
		this.amount = 0;
		this.maxAmount = scoreToUpLevel[this.level];
		this.nextLevel = new TileNode([
			res['background0' + this.level + '_1'],
			res['background0' + this.level + '_2'],
			res['background0' + this.level + '_3']
		]);
		//this.nextLevel.changeLevel = true;
		this.nextLevel.setScale(3);

		var pos = this.background.getTopY() + this.background.y;
		this.nextLevel.removed = false;
		this.nextLevel.setPosition(cc.visibleRect.center.x, pos);
		this.addChild(this.nextLevel, 1);
	},
	getConfigLevel: function () {
		var level = configLevels[this.level];
		var cfg = level[0];
		for (var i = 1; i < level.length; ++i) {
			if (level[i].value > this.clod.volume) {
				break;
			}
			cfg = level[i];
		}
		return cfg;
	}
});

var GameScene = cc.Scene.extend({
	onEnter: function (helped) {
		this._super();
		layer = new Game(helped);
		this.addChild(layer);
	}
});
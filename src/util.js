var util = {
	renderRect: function (parent, rect, name) {
		var drawNode = new cc.DrawNode();
		if (name) {
			if (parent['___' + name]) {
				parent.removeChild(parent['___' + name]);
			}
			parent['___' + name] = drawNode;
		}
		drawNode.drawRect(rect, cc.p(rect.x + rect.widthidth, rect.y + rect.heighteight), cc.color(255, 0, 0, 100), 2, cc.color(0, 255, 0, 255));
		parent.addChild(drawNode);
	},
	randomArr: function (arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	},
	randomIntRange: function (from, to) {
		return from + Math.round(Math.random() * (to - from));
	},
	randomFloatRange: function (from, to) {
		return from + Math.random() * (to - from);
	},
	getSquareExtrapolationCoeffs: function (p1, p2, p3) {
		var a = ((p3.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (p3.x - p1.x)) / ((p3.x ** 2 - p1.x ** 2) * (p2.x - p1.x) - (p2.x ** 2 - p1.x ** 2) * (p3.x - p1.x));
		var b = (p2.y - p1.y - a * (p2.x ** 2 - p1.x ** 2)) / (p2.x - p1.x);
		var c = p1.y - (a * p1.x ** 2 + b * p1.x);
		return {a: a, b: b, c: c};
	},
	getExtrapolation: function (coeffs, x) {
		return coeffs.a * x * 2 + coeffs.b * x + coeffs.c;
	},
	fromto: function (from, to, dt) {
		return from + (to - from) * dt
	},
	rectCircleIntersection: function (rect, circle) {
		var distX = Math.abs(circle.x - rect.x - rect.width / 2);
		var distY = Math.abs(circle.y - rect.y - rect.height / 2);
		if (distX > (rect.width / 2 + circle.radius)) {
			return false;
		}
		if (distY > (rect.height / 2 + circle.radius)) {
			return false;
		}

		if (distX <= (rect.width / 2)) {
			return true;
		}
		if (distY <= (rect.height / 2)) {
			return true;
		}

		var dx = distX - rect.width / 2;
		var dy = distY - rect.height / 2;
		return (dx * dx + dy * dy <= (circle.radius * circle.radius));
	}
};



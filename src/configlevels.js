var helpTexts = {
	'small': 'Eat me',
	'big': 'Evade this',
	'middle': 'Now you can eat this sized things',
};

var sizeObject = this.sizes = {
	'big': cc.visibleRect.width / 3,
	'middle': cc.visibleRect.width * 2 / 9,
	'small': cc.visibleRect.width * 2 / 18
};
var scores = {
	big: 0,
	small: 1,
	middle: 2
};
var damage = 0.25;
var scoreToUpLevel = {
	'1': 50,
	'2': 100,
	'3': 150
};
var configLevels = {
	'1': [{
			value: 0,
			big: {
				min: 1000,
				max: 1500
			},
			middle: {
				min: 400,
				max: 500
			},
			small: {
				min: 100,
				max: 300
			}
		}, {
			value: 0.1,
			big: {
				min: 1000,
				max: 1500
			},
			middle: {
				min: 300,
				max: 400
			},
			small: {
				min: 100,
				max: 300
			}
		}, {
			value: 0.25,
			big: {
				min: 800,
				max: 1200
			},
			middle: {
				min: 250,
				max: 300
			},
			small: {
				min: 100,
				max: 300
			}
		} ,{
			value: 0.8,
			big: {
				min: 700,
				max: 1000
			},
			middle: {
				min: 200,
				max: 250
			},
			small: {
				min: 100,
				max: 300
			}
		}],
	'2': [{
			value: 0,
			big: {
				min: 1000,
				max: 1500
			},
			middle: {
				min: 400,
				max: 500
			},
			small: {
				min: 100,
				max: 300
			}
		}, {
			value: 0.08,
			big: {
				min: 800,
				max: 1200
			},
			middle: {
				min: 250,
				max: 300
			},
			small: {
				min: 100,
				max: 300
			}
		}, {
			value: 0.28,
			big: {
				min: 700,
				max: 1100
			},
			middle: {
				min: 200,
				max: 300
			},
			small: {
				min: 100,
				max: 300
			}
		}, {
			value: 0.6,
			big: {
				min: 400,
				max: 500
			},
			middle: {
				min: 300,
				max: 400
			},
			small: {
				min: 100,
				max: 300
			}
		}, {
			value: 0.8,
			big: {
				min: 300,
				max: 400
			},
			middle: {
				min: 300,
				max: 400
			},
			small: {
				min: 100,
				max: 300
			}
		}],
	'3': [{
			value: 0,
			big: {
				min: 1000,
				max: 1500
			},
			middle: {
				min: 400,
				max: 500
			},
			small: {
				min: 100,
				max: 300
			}
		}, {
			value: 0.06,
			big: {
				min: 800,
				max: 1100
			},
			middle: {
				min: 250,
				max: 300
			},
			small: {
				min: 100,
				max: 300
			}
		}, {
			value: 0.14,
			big: {
				min: 700,
				max: 1000
			},
			middle: {
				min: 200,
				max: 300
			},
			small: {
				min: 100,
				max: 300
			}
		}, {
			value: 0.28,
			big: {
				min: 400,
				max: 600
			},
			middle: {
				min: 100,
				max: 200
			},
			small: {
				min: 100,
				max: 300
			}
		}, {
			value: 0.65,
			big: {
				min: 150,
				max: 350
			},
			middle: {
				min: 200,
				max: 300
			},
			small: {
				min: 100,
				max: 300
			}
		}, {
			value: 0.9,
			big: {
				min: 100,
				max: 300
			},
			middle: {
				min: 300,
				max: 400
			},
			small: {
				min: 100,
				max: 300
			}
		}]
};


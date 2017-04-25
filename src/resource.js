var res = {
	startBacground: 'res/startscreen.png',
	playButton: 'res/play.png',
	helparrow: 'res/helparrow.png',
	lightclod: 'res/lightclod.png',
	finish: 'res/finish.png',
	playagain: 'res/playagain.png',

    background01_1: 'res/background/01-1.png',
	background01_2: 'res/background/01-2.png',
	background01_3: 'res/background/01-3.png',
	background02_1: 'res/background/02-1.png',
	background02_2: 'res/background/02-2.png',
	background02_3: 'res/background/02-3.png',
	background03_1: 'res/background/03-1.png',
	background03_2: 'res/background/03-2.png',
	background03_3: 'res/background/03-3.png',

	proggressbg: 'res/proggressbg.png',
	proggress: 'res/progress.png',

	big01: ['res/1/big-1.png', 'res/1/big-2.png'],

	middle01: ['res/1/middle-1.png', 'res/1/middle-2.png', 'res/1/middle-3.png'],

	small01: ['res/1/small-1.png', 'res/1/small-2.png', 'res/1/small-3.png', 'res/1/small-4.png'],

	big02: ['res/2/big-1.png', 'res/2/big-2.png', 'res/2/big-3.png'],

	middle02: ['res/2/middle-1.png', 'res/2/middle-2.png', 'res/2/middle-3.png'],

	small02: ['res/2/small-1.png', 'res/2/small-2.png'],

	big03: ['res/3/big-1.png', 'res/3/big-2.png'],

	middle03: ['res/3/middle-1.png', 'res/3/middle-2.png', 'res/3/middle-3.png', 'res/3/middle-4.png'],

	small03: ['res/3/small-1.png', 'res/3/small-2.png', 'res/3/small-3.png'],


	Clod_png: "res/clod.png",
};

var g_resources = [];
for (var i in res) {
	if (cc.isArray(res[i])) {
		res[i].forEach(function (src) {
			g_resources.push(src);
		})
	} else {
		g_resources.push(res[i]);
	}
}

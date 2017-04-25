/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Node3D = cc.Node.extend({
	ctor: function () {
		this._super();
		this.sprite = new cc.Sprite(res.Clod_png);
		//this.addChild(this.sprite);
		this.init();
	},
	init: function () {
		this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.z = 400;


		this.scene = new THREE.Scene();

		var texture = new THREE.TextureLoader().load('res/crate.gif');
		var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
		var material = new THREE.MeshBasicMaterial({map: texture});

		this.mesh = new THREE.Mesh(geometry, material);
		this.scene.add(this.mesh);
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);



		this._renderCmd._needDraw = true;
		this._renderCmd._matrix = new cc.math.Matrix4();
		this._renderCmd._matrix.identity();
		this._renderCmd.rendering = function (ctx) {
			var wt = this._worldTransform;
			this._matrix.mat[0] = wt.a;
			this._matrix.mat[4] = wt.c;
			this._matrix.mat[12] = wt.tx;
			this._matrix.mat[1] = wt.b;
			this._matrix.mat[5] = wt.d;
			this._matrix.mat[13] = wt.ty;

			cc.kmGLMatrixMode(cc.KM_GL_MODELVIEW);
			cc.kmGLPushMatrix();
			cc.kmGLLoadMatrix(this._matrix);

			this._node.draw(ctx);

			cc.kmGLPopMatrix();
		};
	},
	draw: function (ctx) {
		this._super(ctx);
		this.renderer.render(this.scene, this.camera);
		this.sprite.setTexture(this.renderer.domElement);
	}
});
// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("hello-world");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("sky", "./assets/space3.png");
    this.load.image("logo", "./assets/phaser3-logo.png");
    this.load.image("red", "./assets/particles/red.png");
  }

  create() {
    // create game objects
    this.add.image(400, 300, "sky");

    const rect = this.add.rectangle(250, 250, 125, 50, 0xff00022);

    this.physics.add.existing(rect);

    this.player = rect;

    this.player.body.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // update game objects
const body = this.player.body;
    
         if (this.cursors.left.isDown) {
      body.setVelocityX(-420);
    } else if (this.cursors.right.isDown) {
      body.setVelocityX(420);
    } else {
      body.setVelocityX(0);
    }

  }
}

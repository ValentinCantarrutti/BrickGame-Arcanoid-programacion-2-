export default class Bola {
  constructor(scene) {
    this.scene = scene;
    this.sprite = scene.add.circle(400, 300, 8.5, 0xffffff);
    scene.physics.add.existing(this.sprite);
    this.sprite.body.setBounce(1);
    this.sprite.body.setCollideWorldBounds(true);
    this.sprite.body.setVelocity(0, 200);
    this.sprite.body.onWorldBounds = true;
  }

  get() {
    return this.sprite;
  }

  destruir() {
    this.sprite.destroy();
  }
}
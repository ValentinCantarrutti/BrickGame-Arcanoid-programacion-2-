export default class Bola {
  constructor(scene) {
    this.scene = scene;
    this.estado = 'normal';

    this.sprite = scene.add.circle(400, 300, 8.5, 0xffffff);
    scene.physics.add.existing(this.sprite);
    this.sprite.body.setBounce(1);
    this.sprite.body.setCollideWorldBounds(true);
    this.sprite.body.setVelocity(0, 200);
    this.sprite.body.onWorldBounds = true;

    // Detecta colisión con bordes del mundo
    scene.physics.world.on('worldbounds', (body) => {
      if (body.gameObject === this.sprite) {
        this.cambiarEstado('golpeada');
      }
    });
  }
  //

  get() {
    return this.sprite;
  }

  destruir() {
    this.cambiarEstado('destruida');
    this.sprite.destroy();
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;

    if (nuevoEstado === 'golpeada') {
      this.sprite.fillColor = 0xffa500; // se modifica a naranja la bola

      this.scene.time.delayedCall(100, () => {
        this.sprite.fillColor = 0xffffff; // la bola vuelve a blanco
        this.estado = 'normal';
      });
    }
  }
}
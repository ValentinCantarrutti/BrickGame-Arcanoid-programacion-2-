export default class Bloques {
  constructor(scene) {
    this.scene = scene;
    this.lista = [];

    const filas = 4;
    const columnas = 6;
    const ancho = 100;
    const alto = 20;
    const espacioX = 120;
    const espacioY = 52;
    const inicioX = 100;
    const inicioY = 55;

    for (let fila = 0; fila < filas; fila++) {
      for (let col = 0; col < columnas; col++) {
        const x = inicioX + col * espacioX;
        const y = inicioY + fila * espacioY;

        const bloque = scene.add.rectangle(x, y, ancho, alto, 0x00ff00);
        scene.physics.add.existing(bloque);
        bloque.body.setImmovable(true);
        bloque.body.allowGravity = false;

        this.lista.push(bloque);
      }
    }
  }

  forEach(callback) {
    this.lista.forEach(callback);
  }

  getActivos() {
    return this.lista.filter(b => b.active);
  }
}
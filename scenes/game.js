// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

import Plataforma from "../objects/Plataforma.js";
import Bloques from "../objects/Bloques.js";
import Bola from "../objects/Bola.js";

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

    this.plataforma = new Plataforma(this); // se crea el rectangulo como clase externa
    this.bloques = new Bloques(this); // se crean los bloques como clase externa
    this.bola = new Bola(this); // se crea la bola como clase externa

    this.bloques.forEach((bloque) => {
      this.physics.add.collider(this.bola.get(), bloque, () => {
        bloque.destroy(); // la bola elimina el bloque que choca
      });
    });

    this.physics.add.collider(this.bola.get(), this.plataforma.sprite, (bola, plataforma) => {
      const diff = bola.x - plataforma.x;

      // si la bola choca en el centro realiza un rebote vertical
      if (Math.abs(diff) < 10) {
        bola.body.setVelocityX(Phaser.Math.Between(-30, 30)); //
      } else {
        // si la boca choca en los bordes realiza un rebote más fuerte hacia los lados
        bola.body.setVelocityX(diff * 5);
      } //
    });

    //mensaje de victoria o derrota
    this.mensaje = this.add.text(400, 300, "", {
      fontSize: "32px",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5).setVisible(false);
    //

    //mensaje de reinicio
    this.reiniciarTexto = this.add.text(400, 350, "Presione R para reiniciar", {
      fontSize: "24px",
      color: "#ffffff",
    }).setOrigin(0.5).setVisible(false);
    //
    this.gameOver = false;

    //creada derrota si la bola toca el fondo
    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      if (body.gameObject === this.bola.get() && down) {
        this.bola.destruir();
        this.physics.pause();
        this.mensaje.setText("Derrota").setVisible(true);
        this.reiniciarTexto.setVisible(true);
        this.gameOver = true;
      }
    });
    //
  }

  update() {
    // update game objects
    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey("R"))) {
      this.scene.restart();
    } //creada la tecla R

    this.plataforma.update(); // la plataforma se mueve hacia los lados

    // creada victoria si se destruyen todas las plataformas
    const bloquesRestantes = this.bloques.getActivos();
    if (bloquesRestantes.length === 0 && !this.gameOver) {
      this.physics.pause();
      this.mensaje.setText("Ganaste").setVisible(true);
      this.reiniciarTexto.setVisible(true);
      this.gameOver = true;
    }
  }
}
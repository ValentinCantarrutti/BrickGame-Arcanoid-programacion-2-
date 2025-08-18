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

    const rect = this.add.rectangle(400, 552, 125, 20, 0xff00022);

    this.physics.add.existing(rect); // se crea el rectangulo
    rect.body.setImmovable(true);   // no deja que se mueva por colision
    rect.body.setCollideWorldBounds(true); // se frena en los bordes de la pantalla
    this.player = rect; // el rectangulo se vuelve el player

    this.cursors = this.input.keyboard.createCursorKeys(); //se crea las teclas

    
    this.bloques = []; //se crea los bloques

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

    const bloque = this.add.rectangle(x, y, ancho, alto, 0x00ff00);
    this.physics.add.existing(bloque);
    bloque.body.setImmovable(true);
    bloque.body.allowGravity = false;

    this.bloques.push(bloque);
  }
}
//

// se crea la bola
const bola = this.add.circle(400, 300, 8.5, 0xffffff);
this.physics.add.existing(bola);
bola.body.setBounce(1);
bola.body.setCollideWorldBounds(true);
bola.body.setVelocity(0, 200);
this.bola = bola;
//

bola.body.onWorldBounds = true; //la bola choca con los bordes

this.bloques.forEach((bloque) => {
  this.physics.add.collider(this.bola, bloque, () => {
    bloque.destroy(); // la bola elimina el bloque que choca
  });
});


this.physics.add.collider(this.bola, this.player, (bola, plataforma) => {
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
  if (body.gameObject === this.bola && down) {
    this.bola.destroy();
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

// la plataforma se mueve hacia los lados
const body = this.player.body;
if (this.cursors.left.isDown) {
  body.setVelocityX(-420);
} else if (this.cursors.right.isDown) {
  body.setVelocityX(420);
} else {
  body.setVelocityX(0);
}
//

// creada victoria si se destruyen todas las plataformas
const bloquesRestantes = this.bloques.filter(b => b.active);
if (bloquesRestantes.length === 0 && !this.gameOver) {
  this.physics.pause();
  this.mensaje.setText("Ganaste").setVisible(true);
  this.reiniciarTexto.setVisible(true);
  this.gameOver = true;
}
}
// 
}

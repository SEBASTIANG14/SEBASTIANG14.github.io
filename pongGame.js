let paleta1, paleta2;
let pelota;
let puntaje1 = 0, puntaje2 = 0;
let puntajeMaximo = 10;

function setup() {
  createCanvas(800, 400);
  paleta1 = new Paleta(10);
  paleta2 = new Paleta(width - 70);
  pelota = new Pelota();
}

function draw() {
  background(0);
  
  paleta1.mostrar();
  paleta2.mostrar();
  paleta1.mover();
  paleta2.mover();
  
  pelota.actualizar();
  pelota.mostrar();
  pelota.verificarPaleta(paleta1);
  pelota.verificarPaleta(paleta2);
  
  fill(255);
  textSize(32);
  text(puntaje1, width / 4, 50);
  text(puntaje2, (3 * width) / 4, 50);
  
  if (puntaje1 >= puntajeMaximo || puntaje2 >= puntajeMaximo) {
    textAlign(CENTER, CENTER);
    text("Juego Terminado", width / 2, height / 2);
    noLoop();
  }
}

function keyPressed() {
  if (key === 'W' || key === 'w') paleta1.direccion = -1;
  if (key === 'S' || key === 's') paleta1.direccion = 1;
  if (keyCode === UP_ARROW) paleta2.direccion = -1;
  if (keyCode === DOWN_ARROW) paleta2.direccion = 1;
}

function keyReleased() {
  if (key === 'W' || key === 'w' || key === 'S' || key === 's') paleta1.direccion = 0;
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) paleta2.direccion = 0;
}

class Paleta {
  constructor(x) {
    this.x = x;
    this.y = height / 2 - 40;
    this.ancho = 10;
    this.alto = 80;
    this.velocidad = 5;
    this.direccion = 0;
  }
  
  mostrar() {
    fill(255);
    rect(this.x, this.y, this.ancho, this.alto);
  }
  
  mover() {
    this.y += this.direccion * this.velocidad;
    this.y = constrain(this.y, 0, height - this.alto);
  }
}

class Pelota {
  constructor() {
    this.reiniciar();
  }
  
  reiniciar() {
    this.x = width / 2;
    this.y = height / 2;
    this.velocidadX = random([-4, 4]);
    this.velocidadY = random(-3, 3);
  }
  
  actualizar() {
    this.x += this.velocidadX;
    this.y += this.velocidadY;
    
    if (this.y <= 0 || this.y >= height) this.velocidadY *= -1;
    
    if (this.x <= 0) {
      puntaje2++;
      this.reiniciar();
    }
    if (this.x >= width) {
      puntaje1++;
      this.reiniciar();
    }
  }
  
  mostrar() {
    fill(255);
    ellipse(this.x, this.y, 15, 15);
  }
  
  verificarPaleta(paleta) {
    if (
      this.x - 7.5 < paleta.x + paleta.ancho &&
      this.x + 7.5 > paleta.x &&
      this.y > paleta.y &&
      this.y < paleta.y + paleta.alto
    ) {
      this.velocidadX *= -1.1;
      this.velocidadY *= 1.1;
    }
  }
}

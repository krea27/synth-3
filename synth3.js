let gify;
let textToWrite = "-----------Deslizate con el mouse por aqui para generar tu eleccion sonora-----------";
let typedText = "";
let typingSpeed = 5; // Velocidad de escritura (cuadros por letra)

let cancion;
let cancionRate = 1; // Inicialmente, la velocidad de reproducción es 1
let volumen = 1; // Inicialmente, el volumen es 1
let reproduciendo = true; // Estado de reproducción

function preload() {
  gify = loadImage('../imagenes/3c.gif');
  cancion = loadSound("../sonido/ab90.wav");
}

function setup() {
  createCanvas(900, 400);
  textSize(16);
  textFont('Source Code Pro, monospace');
  cancion.loop();
}

function draw() {
  background(110);
  displayText();
  typeText();

  // Calcular el centro y el radio del círculo de enmascaramiento
  let centerX = width / 2;
  let centerY = height / 2;
  let circleRadius = 150; // Cambia este valor según tus necesidades

  // Dibuja un círculo de enmascaramiento
  fill(255,250,0);
  ellipse(centerX, centerY, circleRadius * 2);

  // Establece el modo de mezcla para que la imagen solo se muestre dentro del círculo
  blendMode(DARKEST);

  // Muestra la imagen enmascarada
  image(gify, centerX - circleRadius, centerY - circleRadius, circleRadius * 8, circleRadius * 2);

  // Restaura el modo de mezcla a su valor predeterminado
  blendMode(BLEND);

  document.oncontextmenu = function () {
    return false;
  };

  // Actualiza la velocidad de reproducción y el volumen solo si se está reproduciendo y el mouse está dentro del canvas
  if (reproduciendo && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    cancionRate = map(mouseX, 0, width, 2, -1);
    volumen = map(mouseY, 0, height, 4, 0);

    // Aplica los cambios en la velocidad de reproducción y el volumen
    cancion.rate(cancionRate);
    cancion.setVolume(volumen);
  }
}

function displayText() {
  fill(0);
  textSize(16);
  textStyle(BOLD);
  


  text(typedText, 20, 20);
  text("+++++++++Deten la reproduncion o reinicia con la barra espaciadora.+++++++++++", 50, height - 30);
}

function typeText() {
  if (frameCount % typingSpeed === 0 && typedText.length < textToWrite.length) {
    typedText += textToWrite[typedText.length];
  }
}

function keyPressed() {
  var tiempo;

  if (keyCode == LEFT_ARROW && cancion.currentTime() > 1) {
    tiempo = cancion.currentTime() - 1;
  }

  if (keyCode == RIGHT_ARROW && cancion.currentTime() < cancion.duration() - 1) {
    tiempo = cancion.currentTime() + 1;
  }

  cancion.jump(tiempo);

  // Pausa o reproduce el sonido con la barra espaciadora
  if (key == ' ') {
    if (reproduciendo) {
      cancion.pause();
    } else {
      cancion.play();
    }
    reproduciendo = !reproduciendo; // Cambia el estado de reproducción
  }
}

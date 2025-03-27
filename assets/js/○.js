function setup() {
    var canvas = createCanvas(400, 400, WEBGL);
    canvas.parent("sketch");
    angleMode(DEGREES);
    strokeWeight(.2);
    fill("white");
    stroke(0, 0, 0);
    smooth();
  }
  
function draw() { 
    background(255, 255, 255);
    orbitControl();
    sphere();
    cursor(CROSS);
  }
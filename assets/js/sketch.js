function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent("sketch");
  }
  
  function draw() {
    background("black");
    square(50, 50, ((mouseY-50)**2 + (mouseX-50)**2)**0.5/sqrt(2));
    stroke("white")
    line(50, 50, 50, 400);
    line(50, 50, 400, 50);
    line(50, 50, 400, 400);
  }
  
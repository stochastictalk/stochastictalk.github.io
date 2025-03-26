function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background("black");
    if (mouseIsPressed === true) {
      fill(0);
    } else {
      fill(255);
    }
  
    square(50, 50, ((mouseY-50)**2 + (mouseX-50)**2)**0.5/sqrt(2));
    stroke("white")
    line(50, 50, 50, 400);
    line(50, 50, 400, 50);
    line(50, 50, 400, 400);
  }
  
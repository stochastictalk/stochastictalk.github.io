let c_w = 400;
let c_h = 400;
let mvmt;
let pressedKeys = {};
let OFFSET = 10000;
let NOISE_SCALE = 0.005;
let n_links = 50;
let LINK_LENGTH = 1;
let points;
let SPEED = 1;


function setup() {
    let canvas = createCanvas(c_w, c_h);
    canvas.parent("sketch");
    mvmt = createVector(0, 0);
    points = Array(n_links).fill(0).map((e,i)=>createVector(c_w/2, c_h/2));
}

function keyPressed() {
    if (["a", "w", "s", "d"].includes(key)) {
        pressedKeys[key] = true;
    }
}

function keyReleased() {
    if (["a", "w", "s", "d"].includes(key)) {
        delete pressedKeys[key];
    }
}


function draw() {
    background("black");
    stroke("white");
    strokeWeight(10);


    mvmt = createVector(0,0);

    if (pressedKeys.a) {
        mvmt.x -= 1;
    }
    if (pressedKeys.w) {
        mvmt.y -= 1;
    }
    if (pressedKeys.s) {
        mvmt.y += 1;
    }
    if (pressedKeys.d) {
        mvmt.x += 1;
    }
    
    if (mvmt.mag() == 0.) {
        mvmt.x = (mvmt.x + (noise(NOISE_SCALE*points[0].x, NOISE_SCALE*points[0].y, NOISE_SCALE*frameCount)) - 0.5) / 2;
        mvmt.y = (mvmt.y + (noise(NOISE_SCALE*points[0].x + OFFSET, NOISE_SCALE*points[0].y + OFFSET, NOISE_SCALE*frameCount)) - 0.5) / 2;
    }

    // Update the head
    mvmt.setMag(SPEED);
    points[0].add(mvmt);

    // Update the rest of the body
    for (let j = 1; j < points.length; j++) {
        offset = createVector(0, 0);
        offset.add(points[j-1]);
        offset.sub(points[j]);
        offset.setMag(offset.mag() - LINK_LENGTH);
        points[j].add(offset);
    }

    // Render the points
    for (let j = 1; j < points.length; j++) {
        x = points[j].x % c_w;
        y = points[j].y % c_h;

        if (x < 0) {
            x = c_w + x;
        }
        if (y < 0) {
            y = c_h + y;
        }

        point(x, y);
    }

}

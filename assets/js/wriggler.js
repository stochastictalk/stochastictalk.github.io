let c_w = 400;
let c_h = 400;
let mvmt;
let pressedKeys = {};
let OFFSET = 10000;
let NOISE_SCALE = 0.01;
let n_links = 10;
let LINK_LENGTH = 1;
let points =  Array(n_links).fill(0).map((e,i)=>createVector(50, 50));


function setup() {
    let canvas = createCanvas(c_w, c_h);
    canvas.parent("sketch");
    mvmt = createVector(0, 0);
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
    background("white");
    stroke("black");
    strokeWeight(10);

    if (pressedKeys.length > 0) {
        mvmt = createVector(0,0);

        if (pressedKeys.a) {
            mvmt.x -= 1;
        }
        if (pressedKeys.w) {
            mvmt.y += 1;
        }
        if (pressedKeys.s) {
            mvmt.y -= 1;
        }
        if (pressedKeys.d) {
            mvmt.x += 1;
        }
    } else {
        mvmt.x = mvmt.x + (noise(NOISE_SCALE*points[0].x, NOISE_SCALE*points[0].y, NOISE_SCALE*frameCount)) / 2;
        mvmt.y = mvmt.y + (noise(NOISE_SCALE*points[0].x + OFFSET, NOISE_SCALE*points[0].y + OFFSET, NOISE_SCALE*frameCount)) / 2;
    }

    // Update the head
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

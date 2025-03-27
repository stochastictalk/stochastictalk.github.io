let c = 0;
let c_w = 400;
let c_h = 400;
let img_h = 30;
let img_w = Math.floor(2.21*img_h);
let x = c_w/2;
let y = c_h/2;
let M = 2;
let v_x = M**0.5;
let v_y = M**0.5;
let imgs;
let min_x = img_w/2;
let max_x = c_w - img_w/2;
let min_y = img_h/2;
let max_y = c_h - img_h/2;
let threshold = 50;
let n_colors = 10;
let dt = 0.1; 
let MAX_LENGTH = 50;
let mouseHistory = Array(MAX_LENGTH).fill(NaN);

function preload() {
    // Re-rendering the image color at runtime produces a tiny
    // bit of stickiness when the logo bounces - pre-computing
    // the variants of the logo at start-up avoids this
    imgs = loadImageCopies(n_colors);
  }

function setup() {
    let canvas = createCanvas(c_w, c_h);
    canvas.parent("sketch");
    for (j in imgs) {
        toggleImageColor(imgs[j]);
    }
    strokeWeight(0.5);
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function loadImageCopies(n) {
    let imgs = [];
    for (let j = 0; j < n; j++) {
        imgs.push(loadImage('/assets/dvd.png'));
    }
    return imgs
};

function toggleImageColor(img) {

    img.loadPixels();

    color = [getRandomInt(255), getRandomInt(255), getRandomInt(255)]

    for (let i = 0; i < img.pixels.length; i += 4) {
        if (img.pixels[i+3] > threshold) { // Non-transparent
            img.pixels[i] = color[0];
            img.pixels[i + 1] =  color[1];
            img.pixels[i + 2] =  color[2];
        }
    }
    img.updatePixels();
}


function draw() {

    background("white");
    frameRate(60);

    console.log(mouseHistory[mouseHistory.length-1]);
    mouseHistory.shift();
    if (mouseIsPressed) {
        mouseHistory.push([mouseX, mouseY]);
        a_x = (x - mouseX);
        a_y = (y - mouseY);
        m_a = sqrt(a_x**2 + a_y**2);
        v_x = v_x + dt*a_x/m_a;
        v_y = v_y + dt*a_y/m_a;
    } else {
        mouseHistory.push(NaN);
    }

    x = x + v_x;
    y = y + v_y;
    

    // If out of bounds
    if (x < min_x){
        x = x + 2*abs(min_x - x); // Update position
        v_x = -v_x;
        c += 1;
    }

    if (x > max_x){
        x = x - 2*abs(x - max_x);
        v_x = -v_x;
        c += 1;
    }

    if (y < min_y){
        y = y + 2*abs(min_y - y);
        v_y = -v_y;
        c += 1;
    }

    if (y > max_y){
        y = y - 2*abs(y - max_y);
        v_y = -v_y;
        c += 1;
    }

    for (let i=0; i < mouseHistory.length - 1; i++ ) {
        stroke(0, 0, 0, 255*i/mouseHistory.length);
        line(mouseHistory[i][0], mouseHistory[i][1], mouseHistory[i+1][0], mouseHistory[i+1][1]);
    }

    image(imgs[c % n_colors], x - img_w/2, y - img_h/2, img_w, img_h)
}
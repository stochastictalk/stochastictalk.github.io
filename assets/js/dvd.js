let c = 0;
let c_w = 400;
let c_h = 400;
let img_h = 30;
let img_w = Math.floor(2.21*img_h);
let x = c_w/2;
let y = c_h/2;
let v_x = -2;
let v_y = 2.1;
let img;
let min_x = img_w/2;
let max_x = c_w - img_w/2;
let min_y = img_h/2;
let max_y = c_h - img_h/2;
let threshold = 50;

function preload() {
    img = loadImage('/assets/dvd.png');
    img = toggleColor(img, c);
  }

function setup() {
    let canvas = createCanvas(c_w, c_h);
    canvas.parent("sketch");
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function toggleColor(img) {
    color = [getRandomInt(255), getRandomInt(255), getRandomInt(255)]
    img.loadPixels();

    for (let i = 0; i < img.pixels.length; i += 4) {
        if (img.pixels[i+3] > threshold) { // Non-transparent
            img.pixels[i] = color[0];
            img.pixels[i + 1] =  color[1];
            img.pixels[i + 2] =  color[2];
        }
    }

    img.updatePixels();

    return img
};


function draw() {
    background("black");
    frameRate(60);

    x = x + v_x;
    y = y + v_y;

    // If out of bounds
    if (x < min_x){
        x = x + 2*abs(min_x - x); // Update position
        v_x = -v_x;
        c += 1;
        img = toggleColor(img, c);
    }

    if (x > max_x){
        x = x - 2*abs(x - max_x);
        v_x = -v_x;
        c += 1;
        img = toggleColor(img, c);
    }

    if (y < min_y){
        y = y + 2*abs(min_y - y);
        v_y = -v_y;
        c += 1;
        img = toggleColor(img, c);
    }

    if (y > max_y){
        y = y - 2*abs(y - max_y);
        v_y = -v_y;
        c += 1;
        img = toggleColor(img, c);
    }

    image(img, x - img_w/2, y - img_h/2, img_w, img_h)
}
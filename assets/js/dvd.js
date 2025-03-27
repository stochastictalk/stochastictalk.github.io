let c_w = 400;
let c_h = 400;
let img_h = 50;
let img_w = 50;
let x = c_w/2;
let y = c_h/2;
let v = 1;
let v_x = -1;
let v_y = 0.5;
let img;
let min_x = img_w/2;
let max_x = c_w - img_w/2;
let min_y = img_h/2;
let max_y = c_h - img_h/2;

function preload() {
    img = loadImage('/assets/dvd.png');
  }

function setup() {
    let canvas = createCanvas(c_w, c_h);
    canvas.parent("sketch");
};


function draw() {
    background("white");
    frameRate(60);
    // The center bounds around a box of dim img_w - c_w

    x = x + v_x;
    y = y + v_y;

    // If out of bounds
    if (x < min_x){
        x = x + 2*abs(min_x - x); // Update position
        v_x = -v_x;
    }

    if (x > max_x){
        x = x - 2*abs(x - max_x);
        v_x = -v_x;
    }

    if (y < min_y){
        y = y + 2*abs(min_y - y);
        v_y = -v_y;
    }

    if (y > max_y){
        y = y - 2*abs(y - max_y);
        v_y = -v_y;
    }

    image(img, x - img_w/2, y - img_h/2, img_w, img_h)
}
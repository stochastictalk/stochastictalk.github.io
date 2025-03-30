let c_w = 400;
let c_h = 400;
let init_x = c_w/2;
let init_y = c_w/2;
let worm;
let n = 100;
let k = 1.;
let m = 1.;
let dt = 1;
let l = 1;
let PERLIN_SCALE = 0.01;
let PERLIN_OFFSET = 10000;
let SPEED = 10;
let GLOBAL_SPEED_DECAY = 0.5;
let r = 5;

class Worm {
    constructor(n, k, m, dt, l) {
        this.x = Array(n).fill(0).map((e,i)=>createVector(c_w/2 + ((i-n/2)*l), c_h/2)); // Position of each particle
        this.v = Array(n).fill(0).map((e,i)=>createVector(0., 0.)); // Velocity of each particle
        this.f = Array(n).fill(0).map((e,i)=>createVector(0., 0.))
        this.k = k;
        this.n = n;
        this.m = m;
        this.dt = dt;
        this.l = l;
    }

    update() {
        // Motor force from random noise - changes velocity
        let motor_v = createVector(0, 0);
        this.v[0].x = SPEED*(noise(PERLIN_SCALE*this.x[0].x, PERLIN_SCALE*this.x[0].y, PERLIN_SCALE*frameCount*dt) - 0.5)/dt;
        this.v[0].y = SPEED*(noise(PERLIN_SCALE*this.x[0].x + PERLIN_OFFSET, PERLIN_SCALE*this.x[0].y + PERLIN_OFFSET, PERLIN_SCALE*frameCount*dt) - 0.5)/dt;

        for (let j = 0; j <  this.n; j++) { // Compute the forces on each particle
            let f1 = createVector(0, 0);
            let f2 = createVector(0, 0);
            
            if (j < this.n - 1) {
                f1.add(this.x[j+1]).sub(this.x[j]);
                f1.setMag(this.k*(f1.mag() - this.l));
            }
            if (j > 0) {
                f2.add(this.x[j-1]).sub(this.x[j]);
                f2.setMag(this.k*(f2.mag() - this.l));
            }
            this.f[j] = p5.Vector.add(f1, f2);
            let dv = p5.Vector.mult(this.f[j], this.dt/this.m);
            this.v[j].add(dv).mult(GLOBAL_SPEED_DECAY); // To stop numerical errors making the worm crazy
            let dx = this.v[j].copy().mult(this.dt);
            this.x[j].add(dx);
        }
    }
};

function setup() {
    canvas = createCanvas(c_w, c_h);
    canvas.parent("sketch");
    strokeWeight(.5);
    worm = new Worm(n, k, m, dt, l);
}

function draw() {
    if (mouseIsPressed) {
        background("black"); // Draw over the last frame
        stroke("white");
        fill("black");
    } else {
        background("white"); // Draw over the last frame
        stroke("black");
        fill("white");
    }
    // Update the particle positions and velocities
    worm.update();

    // Draw the worm
    for (let j = worm.n - 1; j >= 0; j--) {

        let x = worm.x[j].x % c_w;
        let y = worm.x[j].y % c_h;
        if (x < 0) {
            x = c_w + x;
        }
        if (y < 0) {
            y = c_h + y;
        }
        circle(x, y, r);
    };
}
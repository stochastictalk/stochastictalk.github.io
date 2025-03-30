let c_w = 400;
let c_h = 400;
let init_x = c_w/2;
let init_y = c_w/2;
let worm;

class Worm {
    constructor(n_particles, k, m, dt, l) {
        this.x = Array(n_particles).fill(0).map((e,i)=>createVector(c_w/2 - (n_particles/2 * 15) + (i * 15), c_h/2)); // Position of each particle
        this.v = Array(n_particles).fill(0).map((e,i)=>createVector(0., 0.)); // Velocity of each particle
        this.k = k; // Link stiffness
        this.n = n_particles;
        this.m = m; // Mass of each particle
        this.dt = dt;
        this.l = l;
    }

    update() {
        for (let j = 0; j <  this.n; j++) {
            let dv = createVector(0, 0);
            if ((j > 0) && (j < this.n - 1)) {
                dv.add(this.x[j+1]).sub(this.x[j]).add(this.x[j-1]).sub(this.x[j]);
            }
            if (j == 0) { // Head
                dv.add(this.x[j+1]).sub(this.x[j]); // TODO: need to subtract spring resting length
            }
            if (j == this.n - 1) { // Tail
                dv.add(this.x[j-1]).sub(this.x[j]);
            }
            dv.mult(this.k*this.dt/this.m); // dt x displacement x stiffness / mass

            // Use these forces to update the particle velocity
            this.v[j].add(dv);

            // Use the new velocity to update the position
            let dx = this.v[j].copy();
            dx.mult(this.dt);
            this.x[j].add(dx);
        }
    }
};

function setup() {
    canvas = createCanvas(c_w, c_h);
    canvas.parent("sketch");
    strokeWeight(10);
    stroke("white");
    worm = new Worm(10, 10, 1, .01, 10);
}

function draw() {
    background("black"); // Draw over the last frame

    // Update the particle positions and velocities
    worm.update();

    // Draw the worm
    for (let j = 0; j < worm.n; j++) {
        point(worm.x[j].x, worm.x[j].y);
    };
}
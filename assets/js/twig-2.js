let c_w = 400;
let c_h = 400;

// Three cell types:
// * Apexes
// * Anglers
// * Sleepers
// We start with one (1) spurter, oriented straight up.
// The apexes and sleepers are auxin sources. We first compute the auxin concentration at each cell. 
// For apexes, we:
// * Flip a coin to see if it has a child spurter - the probability depends on the auxin concentration
// * Flip a coin to determine whether the spurter becomes a birther or an angler - the probability depends on the auxin concentration
// For sleepers, we:
// * Flip a coin on whether it forms a new apex - the probability depends on the auxin concentration
// For anglers, we:
// * Update its angle based on its auxin gradient, which is figured out from its orientation, the auxin concentration, and the direction of gravity
// Apexes, anglers, and sleepers are all types of cell. Sleepers are a specialist type of angler.

// Later can incorporate light exposure, and adjust the sleeper and apex probabilities

const CellType = Object.freeze({
    APEX: "apex",
    SLEEPER: "sleeper",
    ANGLER: "angler"
})

class Tree {

    constructor(x_o, y_o) {
        this.x_o = x_o;
        this.y_o = y_o;
        this.stem = Cell() // Parent of all cells
    }

    get apexes() { // TODO: returns list of apex cells
        
    }

    get cells() { // TODO: returns list of all cells

    }

    update() {
        // Update auxin concentrations
        for (const apex of this.apexes) {
            apex.broadcast();
        }

        // Grow
        for (const cell of this.cells) {
            cell.replicate();
            cell.specialise();
            cell.bud();
            cell.orient();
        }
    }

    draw() { // TODO: compute position of all cells based on stem location and relative orientations

    }

}

class Cell {

    constructor(th=0., p=[]) {
        this.th = th; // orientation relative to parent
        this.p = []; // list of parent cells
        this.c = []; // list of children cells
        this.a = 0; // auxin concentration 
        this.type = CellType.APEX // _always_ an apex cell on construction
    }

    get replicate_probability() {
        return 0.5; // TODO: should be a function of auxin concentration!
    }

    get bud_probability() {
        return 0.5; // TODO: should be a function of auxin concentration!
    };

    get sleeper_probability() {
        return 0.5; // TODO: should be a function of auxin concentration!
    };

    get bud_angle() {
        return Math.sign(Math.random()-0.5)*Math.PI/8;
    }

    get gravitropism_angle() { // returns angle based on auxin concentration, cell orientation, and direction of gravity
        return 0.
    }


    // Apex methods
    replicate() { // if apex type, may extend existing branch
        if ((Math.random() <= this.replicate_probability) && (this.type == CellType.APEX)) {
            this.children.push(new Cell(0., [this]));
        }
    }

    specialise() { // if apex type, specialises to a sleeper or an angler
        if ((Math.random() <= this.sleeper_probability) && (this.type == CellType.APEX)) {
            this.type = CellType.SLEEPER;
        } else {
            this.type = CellType.ANGLER;
        }
    }

    broadcast() { // if apex type or sleeper type, broadcasts auxin source value to neighbours
        if (this.type == CellType.APEX) {
            
        }
        
        if (this.type == CellType.SLEEPER) {

        }
    }

    // Sleeper methods
    bud() { // if sleeper type, may form a new branch and turn into an angler
        if ((Math.random() <= this.bud_probability) && (this.type == CellType.SLEEPER)) {
            this.type = CellType.ANGLER;
            let c = new Cell(this.bud_angle, [this]);
            this.children.push(c);
        }
    }

    // Angling methods
    orient() { // Updates orientation relative to parent
        this.th += this.gravitropism_angle;
    }

}

function setup() {
    canvas = createCanvas(c_w, c_h);
    canvas.parent("sketch");
};

function draw() {
    background("aqua");
}
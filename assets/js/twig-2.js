let c_w = 400;
let c_h = 400;
let canvas;
let L = 1; // Scale
let sw = 1; // Stroke weight
let fr = 2; // Frame rate

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

const ALL_CELL_TYPES = [CellType.APEX, CellType.SLEEPER, CellType.ANGLER];

class Tree {

    constructor() {
        this.stem_cell = new Cell(0., null); // Parent of all cells
        this.stem_cell.x_o = 0.;
        this.stem_cell.y_o = 0.;
        this.stem_cell.x_e = this.stem_cell.x_o + Math.sin(this.stem_cell.th);
        this.stem_cell.y_e = this.stem_cell.y_o + Math.cos(this.stem_cell.th);
    }

    _extract_cells_of_type(cell, cell_collection, cell_types) { // Extract all descendent cells of a given type
        // Parents are pushed before children
        if (cell_types.includes(cell.type)) {
            cell_collection.push(cell);
        }
        
        for (const child_cell of cell.c) {
            this._extract_cells_of_type(child_cell, cell_collection, cell_types);
        }
    }

    // Returns all cells in tree of given types in a topologically sorted order
    cells(cell_types) {
        let cell_collection = [];
        this._extract_cells_of_type(this.stem_cell, cell_collection, cell_types);
        return cell_collection
    }

    // Evolve the tree by one step
    update() {
        // All the growth steps - replication, specialisation, budding, and angling - depend on auxin concentration.
        // So we broadcast the auxin concentration from the stem tips and leaves, then run the individual grow steps.

        // Update auxin concentrations
        for (const cell of this.cells([CellType.APEX, CellType.SLEEPER])) {
            cell.broadcast(); // Transmits its auxin concentration up to n steps in all directions
        }

        // Grow
        for (const cell of this.cells(ALL_CELL_TYPES)) {
            this.age += 1;
            cell.replicate(); // Branch apex cells replicate
            cell.specialise(); // Apex cells specialise
            cell.bud(); // Sleepers may bud to new branches
            cell.orient(); // Anglers and sleeper orient themselves w.r.t. gravity
        }
    }

    draw(o_x, o_y, L) {
        // We draw the tree by figuring out the position of all the branches from the position of the stem cell
        for (const cell of this.cells(ALL_CELL_TYPES)) {
            if (!(cell.p == null)) {
                cell.x_o = cell.p.x_e;
                cell.y_o = cell.p.y_e;
            }
            cell.x_e = cell.x_o + Math.sin(cell.th);
            cell.y_e = cell.y_o + Math.cos(cell.th);
            line(o_x + L*cell.x_o, c_h - L*cell.y_o - o_y, o_x + L*cell.x_e, c_h - L*cell.y_e - o_y);
        }
    }
}

class Cell {

    constructor(th=0., p) {
        this.th = th; // global orientation relative to vertical, positive clockwise
        this.p = p; // parent cell
        this.c = []; // list of children cells
        this.a = 0; // auxin concentration 
        this.age = 0; // age
        this.type = CellType.APEX // _always_ an apex cell on construction
    }

    get replicate_probability() {
        return 1.; // TODO: should be a function of auxin concentration!
    }

    get bud_probability() {
        return 1.; // TODO: should be a function of auxin concentration!
    };

    get sleeper_probability() { // Probability of an apex specialising to a sleeper (i.e. a leaf)
        return 0.05; // TODO: should be a function of auxin concentration!
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
            let c = new Cell(this.th, this);
            this.c.push(c);
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
            console.log("Apexes broadcast auxin.");
        }
        
        if (this.type == CellType.SLEEPER) {
            console.log("Sleepers broadcast auxin.");
        }
    }

    // Sleeper methods
    bud() { // if sleeper type, may form a new branch and turn into an angler
        if ((Math.random() <= this.bud_probability) && (this.type == CellType.SLEEPER)) {
            this.type = CellType.ANGLER;
            let c = new Cell(this.th + this.bud_angle, this);
            this.c.push(c);
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
    tree = new Tree();
    frameRate(fr);
    stroke("black");
    strokeWeight(sw);
};

function draw() {
    background("white");
    tree.update();
    tree.draw(c_w/2, 0, L);
    console.log(tree.cells(ALL_CELL_TYPES).length);
}
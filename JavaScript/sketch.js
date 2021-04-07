var brain;

function setup() {
    // size(600, 400);
    background(0);
    brain = new NeuralNetwork(3, 3, 1);
}

function draw() {
    background(0);
    ellipse(300, 200, 20, 20);
}
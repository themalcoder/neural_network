
function setup() {
    createCanvas(600, 400);
    background(0);
    let nn = new NeuralNetwork(2, 2, 2);

    let input = [1, 0];
    let target = [1, 0];
    // let output = nn.feedForward(input);
    // console.log(output);

    nn.train(input, target);
}

function draw() {
    background(0);
    ellipse(300, 200, 20, 20);
}
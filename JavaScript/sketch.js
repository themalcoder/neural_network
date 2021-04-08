
function setup() {
    createCanvas(600, 400);
    background(0);
    let nn = new NeuralNetwork(2, 2, 1);

    let input = [1, 2];
    let output = nn.feedForward(input);
    console.log(output);

}

function draw() {
    background(0);
    ellipse(300, 200, 20, 20);
}
let training_data = [
    {
        input: [0, 0],
        target: [0]
    },
    {
        input: [1, 1],
        target: [0]
    },
    {
        input: [0, 1],
        target: [1]
    },
    {
        input: [1, 0],
        target: [1]
    },
]


function setup() {
    createCanvas(600, 400);
    // background(0);
    let nn = new NeuralNetwork(2, 2, 1);

    for(let i = 0; i < 100000; i++) {
        let data = random(training_data);
        nn.train(data.input, data.target);
    }

    console.log("Predicted ---> ", nn.feedForward([0, 0])[0], " Expected ---> ", 0);
    console.log("Predicted ---> ", nn.feedForward([0, 1])[0], " Expected ---> ", 1);
    console.log("Predicted ---> ", nn.feedForward([1, 0])[0], " Expected ---> ", 1);
    console.log("Predicted ---> ", nn.feedForward([1, 1])[0], " Expected ---> ", 0);
    
    // let input = [1, 0];
    // let target = [1, 0];
    // let output = nn.feedForward(input);
    // console.log(output);

    // nn.train(input, target);
}

function draw() {
    background(0);
    ellipse(300, 200, 20, 20);
}
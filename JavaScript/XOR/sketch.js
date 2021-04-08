let nn;
let learning_rate_slider;
let training_data = [
  {
    input: [0, 0],
    output: [0]
  },
  {
    input: [1, 1],
    output: [0]
  },
  {
    input: [1, 0],
    output: [1]
  },
  {
    input: [0, 1],
    output: [1]
  }
];

function setup() {
  createCanvas(400, 400);
  nn = new NeuralNetwork(2, 4, 1);
  learning_rate_slider = createSlider(0.01, 0.5, 0.1, 0.01);
}

function draw() {
  background(0);

  for(let i = 0; i < 10000; i++) {
    let data = random(training_data);
    nn.train(data.input, data.output);
  }

  nn.setLearningRate(learning_rate_slider.value());

  let res = 10; // The resolution for the cells drawn
  let cols = width / res;
  let rows = height / res;

  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      
      let input = [x1, x2];
      let y = nn.feedForward(input);
      noStroke();
      fill(y * 255);
      rect(i * res, j * res, res, res);
    }
  }
}

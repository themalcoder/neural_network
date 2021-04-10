let circles = [];
let squares = [];
let triangles = [];

let imagesLength = 150;

let canvas;
let resultsDiv;

let inputImage;

let clearButton;

function preload() {
  for (let i = 0; i < imagesLength; i++) {
    let index = nf(i + 1, 4, 0);
    circles[i] = loadImage(`data/circle${index}.png`);
    squares[i] = loadImage(`data/square${index}.png`);
    triangles[i] = loadImage(`data/triangle${index}.png`);
  }
}

let nn;

function setup() {
  canvas = createCanvas(400, 400);
  inputImage = createGraphics(64, 64);
  
  background(255);
  clearButton = createButton('clear');
  clearButton.mousePressed(function() {
    background(255);
  });

  resultsDiv = createDiv('Loading Model');

  nn = NeuralNetwork(, 128, 3);
  
  trainData();
}

function trainData() {
  // adding data in ml5
  for(let i = 0; i < circles.length; i++) {
    let input = {image: circles[i]};
    let target = {label: "circle"};
    // nn.addData(input, target);
    
    input = {image: squares[i]};
    target = {label: "square"};
    // nn.addData(input, target);
    
    input = {image: triangles[i]};
    target = {label: "triangle"};
    // nn.addData(input, target);
  }
  nn.train(input, target);
}


function finishedTraining() {
  console.log("Finished training!");
}
  
function gotResults(err, results) {
  if(err) {
    console.error(err);
    return;
  }

  let label = results[0].label;
  let confidence = nf(100 * results[0].confidence, 2, 0);
  resultsDiv.html(`${label} ${confidence}%`);
  // console.log(results);
  classifyImage();
}
  
function classifyImage() {
  inputImage = createGraphics(64, 64);
  inputImage.copy(canvas, 0, 0, width, height, 0, 0, 64, 64);
  // image(inputImage, 0, 0);

  nn.feedForward(inputImage);
}

function draw() {
  if(mouseIsPressed) {
    strokeWeight(8);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

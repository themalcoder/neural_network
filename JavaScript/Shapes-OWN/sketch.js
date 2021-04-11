let imagesLength = 400;
let threshold = Math.floor(0.8 * imagesLength);
let trainingLength = threshold;
let testingLength = imagesLength - trainingLength;

let circles = [];
let circlesData = {};

let squares = [];
let squaresData = {};

let triangles = [];
let trianglesData = {};

let pixelData = [];
let completeData = [];

let trainingData = [];
let testingData = [];

let inputImage;

let canvas;
let resultsDiv;
let clearButton;

const CIRCLE = 0;
const SQUARE = 1;
const TRIANGLE = 2;

function preload() {
  print("Loading data!");
  for (let i = 0; i < imagesLength; i++) {
    let index = nf(i + 1, 4, 0);
    circles[i] = loadImage(`data/circle${index}.png`);
    squares[i] = loadImage(`data/square${index}.png`);
    triangles[i] = loadImage(`data/triangle${index}.png`);
  }
  console.log("Data loaded!");
}

let nn;

function setup() {
  background(255);
  canvas = createCanvas(400, 400);
  inputImage = createGraphics(28, 28);
  clearButton = createButton('Clear');
  clearButton.mousePressed(function() {
    background(255);
  });

  // resultsDiv = createDiv('Preparing Data');
  
  console.log("Preparing data");

  // Preparing data
  dataPreset(circles, CIRCLE);
  dataPreset(squares, SQUARE);
  dataPreset(triangles, TRIANGLE);
  
  prepareData(circlesData, CIRCLE);
  prepareData(squaresData, SQUARE);
  prepareData(trianglesData, TRIANGLE);
  
  trainingData = trainingData.concat(circlesData.training);
  trainingData = trainingData.concat(squaresData.training);
  trainingData = trainingData.concat(trianglesData.training);
  
  
  // Randomizing the data
  shuffle(trainingData, true);
  // console.log(trainingData);
  
  testingData = testingData.concat(circlesData.testing);
  testingData = testingData.concat(squaresData.testing);
  testingData = testingData.concat(trianglesData.testing);
  shuffle(testingData, true);
  
  resultsDiv = createDiv('Data Prepared');
  console.log("Data Prepared!");
  console.log("");
  
  // Making the Neural Network
  nn = new NeuralNetwork(784, 64, 3); //28 * 28 dimensions

  nn.setLearningRate(0.01); // learning rate of 0.01 works best for this.
  
  let trainButton = select('#train');
  let epochCounter = 0;
  trainButton.mousePressed(function () {
    trainData();
    epochCounter++;
    console.log(`Epoch: ${epochCounter}`);
  });
  
  let testButton = select('#test');
  testButton.mousePressed(function () {
    let percent = testData(testingData);
    console.log(`Correct : ${percent} %`);
  });
  
  // let guessButton = select('#guess');
  // guessButton.mousePressed(function () {
  //   classifyImage();
  // });
}



function classifyImage() {
  let inputs = [];
  let img = get();
  img.resize(28, 28);
  // console.log(img);
  img.loadPixels();
  for(let i = 0; i < 784; i ++) {
    let bright = img.pixels[i * 4];
    inputs[i] = bright / 255.0;
  }
  // console.log(inputs);
  let guess = nn.feedForward(inputs);
  let m = max(guess);
  let classification = guess.indexOf(m);
  if(classification === CIRCLE) {
    resultsDiv.html(`Circle`);
    // console.log("Circle");
  } else if(classification === SQUARE) {
    resultsDiv.html(`Square`);
    // console.log("Square");
  } else if(classification === TRIANGLE) {
    resultsDiv.html(`Triangle`);
    // console.log("Triangle");
  }
}

function draw() {
  // background(255);
  if(mouseIsPressed) {
    strokeWeight(16);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  classifyImage();
  // noLoop();
}

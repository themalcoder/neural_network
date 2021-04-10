let circles = [];
let circlesData = {};

let squares = [];
let squaresData = {};

let triangles = [];
let trianglesData = {};

let pixelData = [];
let completeData = [];

let imagesLength = 500;
let threshold = Math.floor(0.8 * imagesLength);
let trainingLength = threshold;
let trainingData = [];
let testingLength = imagesLength - trainingLength;
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

function dataPreset(data, label) {
  // let tempData = [];
  for(let i = 0; i < data.length; i++) {
    data[i].loadPixels();
    for(let j = 0; j < 784; j++) {
      pixelData.push((data[i].pixels[j*4] / 255)); // normalizing the data, here only.
    }
    let targets = [0, 0, 0];
    targets[label] = 1;
    completeData.push({data: pixelData, target: targets});
    pixelData = [];
    // return tempData;
  }
}

function prepareData(catagory, label) {
  catagory.training = [];
  catagory.testing = [];
  let offset = 0;
  if(label === 0) {
    offset = imagesLength * 0;
  } else if(label === 1) {
    offset = imagesLength * 1;
  } else if(label === 2) {
    offset = imagesLength * 2;
  }

  for(let i = 0; i < imagesLength; i++) {
    if(i < trainingLength) {
      catagory.training.push(completeData[i + offset]);
    } else {
      catagory.testing.push(completeData[i + offset]);
    }
  }
}

function setup() {
  background(255);
  canvas = createCanvas(400, 400);
  inputImage = createGraphics(28, 28);
  clearButton = createButton('clear');
  clearButton.mousePressed(function() {
    background(255);
  });

  resultsDiv = createDiv('Loading Model');

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
  // Making the Neural Network
  nn = new NeuralNetwork(784, 64, 3); //28 * 28 dimensions

  nn.setLearningRate(0.01); // learning rate of 0.01 works best for this.
  trainData(20);

  // console.log("Running the tests");
  // testData(testingData);
}

function trainData(epochs = 1) {
  
  shuffle(trainingData, true);

  console.log(`Training for ${epochs} epochs!`);
  for(let e = 0; e < epochs; e++) {
    for(let i = 0; i < trainingData.length; i++) {
      let input = trainingData[i].data;
      let target = trainingData[i].target;
      nn.train(input, target);
    }
    console.log(`Epoch : ${e + 1}`);
    testData(testingData);
    console.log("");
  }
  console.log('Training done!');
}

function testData(testing) {
  let correct = 0;
  for(let i = 0; i < testing.length; i++) {
    let input = testing[i].data;
    let target = testing[i].target;

    let guess = nn.feedForward(input);
    let m = max(guess);
    let classification = guess.indexOf(max(m));
    let label = target.indexOf(1);
    // console.log(guess);
    // console.log(classification);
    // console.log(target);

    if(classification === label) {
      correct++;
    }

  }
  let percent = nf(100 * correct / testing.length, 2, 2);
  console.log(`Correct : ${percent}%`);
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
  resultsDiv.html(`${label} ${confidence} %`);
  // console.log(results);
  classifyImage();
}
  
function classifyImage() {
  inputImage = createGraphics(64, 64);
  inputImage.copy(canvas, 0, 0, width, height, 0, 0, 64, 64);
  // image(inputImage, 0, 0);

  // nn.feedForward(inputImage);
}

// function draw() {
//   if(mouseIsPressed) {
//     strokeWeight(8);
//     line(mouseX, mouseY, pmouseX, pmouseY);
//   }
// }

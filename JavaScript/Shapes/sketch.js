let circles = [];
let squares = [];
let triangles = [];

let imagesLength = 1000;

let canvas;
let resultsDiv;

let inputImage;

let clearButton;

// function preload() {
//   for (let i = 0; i < imagesLength; i++) {
//     let index = nf(i + 1, 4, 0);
//     circles[i] = loadImage(`data/circle${index}.png`);
//     squares[i] = loadImage(`data/square${index}.png`);
//     triangles[i] = loadImage(`data/triangle${index}.png`);
//   }
// }

let shapeClassifier;

function setup() {
  canvas = createCanvas(400, 400);
  inputImage = createGraphics(64, 64);
  // background(0);
  
  background(255);
  clearButton = createButton('clear');
  clearButton.mousePressed(function() {
    background(255);
  });

  resultsDiv = createDiv('Loading Model');

  let options = {
    inputs: [64, 64, 4], // width and height and 4 color channels (r, g, b, a)
    task: "imageClassification",
    debug: true
  };

  shapeClassifier = ml5.neuralNetwork(options);
  
  const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  }


  shapeClassifier.load(modelDetails, modelLoaded);
  // trainData();
}


function modelLoaded() {
  console.log('Model has been loaded!');
  classifyImage();
}

function trainData() {
  // adding data in ml5
  for(let i = 0; i < circles.length; i++) {
    let input = {image: circles[i]};
    let target = {label: "circle"};
    shapeClassifier.addData(input, target);
    
    input = {image: squares[i]};
    target = {label: "square"};
    shapeClassifier.addData(input, target);
    
    input = {image: triangles[i]};
    target = {label: "triangle"};
    shapeClassifier.addData(input, target);
  }
  shapeClassifier.normalizeData();
  shapeClassifier.train({epochs: 50}, finishedTraining);
}


function finishedTraining() {
  console.log("Finished training!");
  shapeClassifier.save();
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

  shapeClassifier.classify({image: inputImage}, gotResults);
}

function draw() {
  if(mouseIsPressed) {
    strokeWeight(8);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

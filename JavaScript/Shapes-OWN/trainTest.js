function trainData(epochs = 1) {
  
    shuffle(trainingData, true);
  
    // console.log(`Training for ${epochs} epochs!`);
    // console.log("Training");
    for(let e = 0; e < epochs; e++) {  
      for(let i = 0; i < trainingData.length; i++) {
        let input = trainingData[i].data;
        let target = trainingData[i].target;
        nn.train(input, target);
      }
      // console.log(`Epoch : ${e + 1}`);
      testData(testingData);
    }
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
  return percent;
}
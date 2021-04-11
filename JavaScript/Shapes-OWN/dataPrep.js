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
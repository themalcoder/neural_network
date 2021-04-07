// This is the constructor function
function NeuralNetwork(numberOfInputNodes, numberOfHiddenNodes, numberOfOutputsNodes) {
    this.input_nodes = numberOfInputNodes;
    this.hidden_nodes = numberOfHiddenNodes;
    this.numberOfOutputs = numberOfOutputsNodes;
}

// Next step - Feed Forward Process
// Working - we recieve inputs. The idea is we do weighted sum. 
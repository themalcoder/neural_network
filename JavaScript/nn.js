function sigmoid(x) {
    return (1 / (1 + Math.exp(-x)));
}

class NeuralNetwork {
    // This is the constructor function
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes); //weights_ih ---> weights b/w input and hidden layer
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes); //weights_ho ---> weights b/w hidden and output layer
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_h.randomize();
        this.bias_o = new Matrix(this.output_nodes, 1);
        this.bias_o.randomize();
    }

    // Next step - Feed Forward Process
    // This feedForward function expects an array (of inputs)
    feedForward(input_array) {

        // Generating Hidden Outputs
        let input = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih, input);
        
        hidden.add(this.bias_h);
        
        // Activation Function!
        hidden.map(sigmoid);

        // Generating the output's output!
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        // returning it back
        return output.toArray();   
    }
}


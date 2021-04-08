function sigmoid(x) {
    return (1 / (1 + Math.exp(-x)));
}

function dsigmoid(y) {
    // return (sigmoid(x) * (1 - sigmoid(x)));
    return (y * (1 - y));
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

        this.learning_rate = 0.1;
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

    // now to train the data (just calculating the error and tweaking it)
    // also known as Backpropogation

    train(input_array, target_array) {
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

        // Convert array to Matrix object
        let target = Matrix.fromArray(target_array);

        // Calculate the error
        // ERROR = TARGET - OUTPUT
        let output_error = Matrix.subtract(target, output);
        // error.print();
        output.map(dsigmoid);
        
        let gradient = Matrix.map(output, dsigmoid);
        // console.log("gradient ---> ", gradient);
        gradient.multiply(output_error);
        gradient.multiply(this.learning_rate);
        
        
        // let gradient = output * (1 - output); // Life would've been easier if I had NumPy.


        // Calculate deltas
        let hidden_transpose = Matrix.transpose(hidden);
        let weight_ho_deltas = Matrix.multiply(gradient, hidden_transpose);
        
        // Adjust the weigths by deltas
        this.weights_ho.add(weight_ho_deltas);
        // Adjust the bias by its deltas (which is just the gradient)
        this.bias_o.add(gradient);

        // Calculate the hidden layer errors
        let weights_ho_transpose = Matrix.transpose(this.weights_ho);
        let hidden_error = Matrix.multiply(weights_ho_transpose, output_error);
        
        // Calculate hidden gradient
        let hidden_gradient = Matrix.map(hidden, dsigmoid);
        hidden_gradient.multiply(hidden_error);
        hidden_gradient.multiply(this.learning_rate);

        // Calculate input-to-hidden (input --> hidden) deltas
        let input_transpose = Matrix.transpose(input);
        let weight_input_hidden_deltas = Matrix.multiply(hidden_gradient, input_transpose);
        this.weights_ih.add(weight_input_hidden_deltas);

        // Adjust the bias by deltas (which is just the gradient)
        this.bias_h.add(hidden_gradient);
    }
}


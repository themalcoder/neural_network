
from matrix import Matrix
from activation import activation_function
import dill


class neural_network():
    def __init__(self, input_nodes: int, hidden_nodes: int, output_nodes: int):
        self.input_nodes = input_nodes
        self.hidden_nodes = hidden_nodes
        self.output_nodes = output_nodes

        self.weights_ih = Matrix(self.hidden_nodes, self.input_nodes)
        self.weights_ho = Matrix(self.output_nodes, self.hidden_nodes)
        self.weights_ih.randomize()
        self.weights_ho.randomize()

        self.bias_h = Matrix(self.hidden_nodes, 1)
        self.bias_o = Matrix(self.output_nodes, 1)
        self.bias_h.randomize()
        self.bias_o.randomize()
        self.set_learning_rate()

        self.set_activation_function()

    def predict(self, input_list: list) -> list:
        # Generating the Hidden Outputs
        inputs = Matrix.from_list(input_list)
        hidden = Matrix.static_multiply(self.weights_ih, inputs)
        hidden.add(self.bias_h)

        # Activation function!
        hidden.map(self.activation_function.x)

        # Generating the output's output!
        output = Matrix.static_multiply(self.weights_ho, hidden)
        output.add(self.bias_o)
        output.map(self.activation_function.x)

        # Sending back to the caller!
        return output.to_list()

    def set_learning_rate(self, learning_rate: float = 0.1):
        self.learning_rate = learning_rate

    def set_activation_function(self, func: activation_function = activation_function.sigmoid()):
        self.activation_function = func

    def train(self, input_list: list, target_list: list):
        # Generating the Hidden Outputs
        inputs = Matrix.from_list(input_list)
        hidden = Matrix.static_multiply(self.weights_ih, inputs)
        hidden.add(self.bias_h)
        # activation function!
        hidden.map(self.activation_function.x)

        # Generating the output's output!
        outputs = Matrix.static_multiply(self.weights_ho, hidden)
        outputs.add(self.bias_o)
        outputs.map(self.activation_function.x)

        # Convert array to matrix object
        targets = Matrix.from_list(target_list)

        # Calculate the error
        # ERROR = TARGETS - OUTPUTS
        output_errors = Matrix.subtract(targets, outputs)

        # Calculate gradient
        gradients = Matrix.static_map(outputs, self.activation_function.y)
        gradients.multiply(output_errors)
        gradients.multiply(self.learning_rate)

        # Calculate deltas
        hidden_T = Matrix.transpose(hidden)
        weight_ho_deltas = Matrix.static_multiply(gradients, hidden_T)

        # Calculate the hidden layer errors
        who_t = Matrix.transpose(self.weights_ho)
        hidden_errors = Matrix.static_multiply(who_t, output_errors)

        # Calculate hidden gradient
        hidden_gradient = Matrix.static_map(hidden, self.activation_function.y)
        hidden_gradient.multiply(hidden_errors)
        hidden_gradient.multiply(self.learning_rate)

        # Calcuate input->hidden deltas
        inputs_T = Matrix.transpose(inputs)
        weight_ih_deltas = Matrix.static_multiply(hidden_gradient, inputs_T)

        self.weights_ih.add(weight_ih_deltas)
        # Adjust the bias by its deltas(which is just the gradients)
        self.bias_h.add(hidden_gradient)

        # Adjust the weights by deltas
        self.weights_ho.add(weight_ho_deltas)
        # Adjust the bias by its deltas(which is just the gradients)
        self.bias_o.add(gradients)

    # def serialize(self) -> bytes:
    #     return dill.dumps(self)

    # @staticmethod
    # def deserialize(data: bytes) -> 'neural_network':
    #     return dill.loads(data)

    def save_model(self, file_name):
        '''
        This helps in saving the (trained) model. This will allow to just load the (saved) model and just go ahead and run or predict the data.

        Just pass the 'file name' for the saved file
        '''
        dill.dump(self, open(file_name, mode='wb'))
        print(f"Model saved as '{file_name}'")

    def load_model(self, file_name):
        '''
        This helps in loading the (trained) model. This will allow to just load the (saved) model and just go ahead and run or predict the data.

        Just pass the 'file name' for the saved saved model and it probably works right off the bat.
        print(f"Loading model {file_name}")
        '''
        return dill.load(open(file_name, mode='rb'))
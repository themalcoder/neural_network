// let m = new Matrix(3, 2) // ---> The idea, generate a matrix
class Matrix {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        for(let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for(let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }

    add(n) {
        // this checks if n is a type Matrix, then it adds element wise otherwise it just adds n to all the items of Matrix
        if(n instanceof Matrix) {
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
    }

    randomize() {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.data[i][j] += Math.random() * 2 - 1; // getting random numbers b/w 1 and -1
            }
        }
    }

    static multiply(a, b) {
        if(a instanceof Matrix && b instanceof Matrix) {
            // Matrix product
            if(a.cols !== b.rows) {
                console.log('Columns of A must match rows of B.');
                return undefined;
            }

            let result = new Matrix(a.rows, b.cols);
            for(let i = 0; i < result.rows; i++) {
                for(let j = 0; j < result.cols; j++) {
                    let sum = 0;
                    for(let k = 0; k < a.cols; k++) {
                        sum += a.data[i][k] * b.data[k][j];
                    }
                    result.data[i][j] = sum;
                }
            }
            return result;
        }
    console.log("Passed are not instances of Matrices!");
    console.log("a instanceof Matrix", a instanceof Matrix);
    console.log("b instanceof Matrix", b instanceof Matrix);
    return;
    }

    multiply(n) {
        // Scalar product
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.data[i][j] *= n;
            }
        }
    }
    
    map(func) {
        // Apply a function to every element of matrix
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                let val = this.data[i][j];
                this.data[i][j] = func(val);
            }
        }
    }

    static transpose(m) {
        let result = new Matrix(m.cols, m.rows);
        for(let i = 0; i < m.rows; i++) {
            for(let j = 0; j < m.cols; j++) {
                result.data[j][i] = m.data[i][j];
            }
        }
        return result;
    }

    print() {
        console.table(this.data);
    }

    static fromArray(arr) {
        if(arr instanceof Array) {
            let matrix = new Matrix(arr.length, 1);
            for(let i = 0; i < arr.length; i++) {
                matrix.data[i][0] = arr[i];
            }
            return matrix;
        }
        console.log("Can not convert this to a matrix. Perhaps not an Array.");
        return undefined;
    }

    // This toArray function will give me back the outout in array form once acted upon a Matrix object
    toArray() {
        let arr = [];
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }
}

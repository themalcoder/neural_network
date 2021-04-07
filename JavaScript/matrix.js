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
                this.data[i][j] += Math.floor(Math.random() * 10);
            }
        }
    }

    static multiply(a, b) {
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
}

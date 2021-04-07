// let m = new Matrix(3, 2) // ---> The idea, generate a matrix
class Matrix {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];

        for(let i = 0; i < this.rows; i++) {
            this.matrix[i] = [];
            for(let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    add(n) {
        // this checks if n is a type Matrix, then it adds element wise otherwise it just adds n to all the items of Matrix
        if(n instanceof Matrix) {
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += n.matrix[i][j];
                }
            }
        } else {
            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += n;
                }
            }
        }
    }

    randomize() {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.matrix[i][j] += Math.floor(Math.random() * 10);
            }
        }
    }


    multiply(n) {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.matrix[i][j] *= n;
            }
        }
    }
}

import { i, MathMatrix, matrix, minus_i, multiply, to_complex } from "./Math.js";
import { Qubit } from "./Qubit.js";
export class Gate {
    operation;
    constructor(operation) {
        if (operation instanceof MathMatrix) {
            this.operation = operation;
        }
        else {
            operation = operation.map(x => x.map(to_complex));
            this.operation = matrix(operation);
        }
    }
}

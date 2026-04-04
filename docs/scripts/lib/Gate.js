import { MathMatrix, matrix, to_complex } from "./Math.js";
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

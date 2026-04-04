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
export const IdentityGate = new Gate([
    [1, 0],
    [0, 1]
]);
export const ZeroProjector = new Gate([
    [1, 0],
    [0, 0]
]);
export const OneProjector = new Gate([
    [0, 0],
    [0, 1]
]);
export const XGate = new Gate([
    [0, 1],
    [1, 0]
]);
export const YGate = new Gate([
    [0, minus_i],
    [i, 0]
]);
export const ZGate = new Gate([
    [1, 0],
    [0, -1]
]);
export const HadamardGate = new Gate([
    [Math.SQRT1_2, Math.SQRT1_2],
    [Math.SQRT1_2, -Math.SQRT1_2]
]);

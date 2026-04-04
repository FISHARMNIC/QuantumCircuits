import { i, MathMatrix, matrix, minus_i, multiply, to_complex, type Complex, type ComplexMatrix } from "./Math.js";
import { Qubit } from "./Qubit.js";

export class Gate {
    operation: ComplexMatrix;

    constructor(operation: number[][] | Complex[][] | ComplexMatrix) {
        if(operation instanceof MathMatrix)
        {
            this.operation = operation;
        }
        else
        {
            operation = operation.map(x => x.map(to_complex));
            this.operation = matrix(operation) as ComplexMatrix;
        }
    }

    // public apply(bit: Qubit): Qubit {
    //     const res =  multiply<ComplexMatrix>(this.operation, bit.matrix) as ComplexMatrix;

    //     return new Qubit(res.get([0]) as Complex, res.get([1]) as Complex);
    // }
}

export const IdentityGate: Gate = new Gate([
    [1, 0],
    [0, 1]
]);

export const ZeroProjector: Gate = new Gate([
    [1, 0],
    [0, 0]
]);

export const OneProjector: Gate = new Gate([
    [0, 0],
    [0, 1]
]);

export const XGate: Gate = new Gate([
    [0, 1],
    [1, 0]
]);


export const YGate: Gate = new Gate([
    [0, minus_i],
    [i, 0]
]);


export const ZGate: Gate = new Gate([
    [1, 0],
    [0, -1]
]);

export const HadamardGate: Gate = new Gate([
    [Math.SQRT1_2, Math.SQRT1_2],
    [Math.SQRT1_2, -Math.SQRT1_2]
]);
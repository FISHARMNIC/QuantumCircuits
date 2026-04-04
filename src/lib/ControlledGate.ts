import { Gate } from "./Gate.js";
import { type Complex, type ComplexMatrix } from "./Math.js";

export class ControlledGate
{
    gate: Gate;

    constructor(operation: number[][] | Complex[][] | ComplexMatrix)
    {
        this.gate = new Gate(operation);
    }

    // public apply(target: Qubit, control: Qubit, control2?: Qubit): Qubit {
    //     const psi = TensorProduct(control.matrix, target.matrix);

    //     const res = multiply<ComplexMatrix>(this.gate.operation, psi) as ComplexMatrix;
    //     return new Qubit(res.get([0]) as Complex, res.get([1]) as Complex);
    // }
}

export type GateLike = Gate | ControlledGate;

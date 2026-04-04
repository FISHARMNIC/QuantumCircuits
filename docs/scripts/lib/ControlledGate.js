import { Gate, XGate } from "./Gate.js";
import { multiply } from "./Math.js";
import { Qubit } from "./Qubit.js";
import { TensorProduct } from "./Tensor.js";
export class ControlledGate {
    gate;
    constructor(operation) {
        this.gate = new Gate(operation);
    }
}
export const CNOTGate = new ControlledGate(XGate.operation);

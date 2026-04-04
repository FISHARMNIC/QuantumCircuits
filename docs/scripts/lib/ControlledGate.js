import { Gate } from "./Gate.js";
import { multiply } from "./Math.js";
import { Qubit } from "./Qubit.js";
import { TensorProduct } from "./Tensor.js";
export class ControlledGate {
    gate;
    constructor(operation) {
        this.gate = new Gate(operation);
    }
}

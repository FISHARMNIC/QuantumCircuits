import { Gate } from "./Gate.js";
import {} from "./Math.js";
export class ControlledGate {
    gate;
    constructor(operation) {
        this.gate = new Gate(operation);
    }
}

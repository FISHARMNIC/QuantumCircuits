import { BinaryArray } from "../lib/Binary.js";
import { Circuit } from "../lib/Circuit.js";
import { Gates } from "../lib/GateExports.js";
import { State } from "../lib/State.js";
const input = new State(new BinaryArray([0, 0, 1]));
export const exampleCircuit = new Circuit(input);
exampleCircuit.addGate(1, {
    gate: Gates.XGate,
    target: input.bitIndex(1)
});
exampleCircuit.addGate(2, {
    gate: Gates.HadamardGate,
    target: input.bitIndex(1)
});
exampleCircuit.addGate(3, {
    gate: Gates.XGate,
    target: input.bitIndex(0)
});
exampleCircuit.addGate(3, {
    gate: Gates.XGate,
    target: input.bitIndex(2)
});

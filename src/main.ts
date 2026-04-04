import { adderCircuit } from "./examples/adder.js";
import { exampleCircuit } from "./examples/exampleCircuit.js";
import { BinaryArray, type Bit } from "./lib/Binary.js";
import { Circuit } from "./lib/Circuit.js";
import { CNOTGate } from "./lib/ControlledGate.js";
import { HadamardGate, XGate } from "./lib/Gate.js";
import { outputWrite } from "./lib/Html.js";
import { State, type StateProbability } from "./lib/State.js";


const result = exampleCircuit.run();
result.print();

// const result = adderCircuit.run();
// result.print(['A   ', 'B   ', 'Sum ', 'Cout']);
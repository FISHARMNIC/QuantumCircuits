// adder (see adder.png)

import { BinaryArray, type Bit } from "../lib/Binary.js";
import { Circuit } from "../lib/Circuit.js";
import { Gates } from "../lib/GateExports.js";
import { State } from "../lib/State.js";

enum Bits {
    A, B, CarryIn, Zero
};

enum BitsOut {
    A, B, Sum, CarryOut
};

const input_numbers: Bit[] = [1, 1];

const input = new State(new BinaryArray([...input_numbers, 0, 0]));
export const adderCircuit = new Circuit(input);

adderCircuit.addGate(1, {
    gate: Gates.CNOTGate,
    target: input.bitIndex(Bits.Zero),
    control: input.bitIndex(Bits.A),
    control2: input.bitIndex(Bits.B)
});

adderCircuit.addGate(2, {
    gate: Gates.CNOTGate,
    target: input.bitIndex(Bits.B),
    control: input.bitIndex(Bits.A)
});

adderCircuit.addGate(3, {
    gate: Gates.CNOTGate,
    target: input.bitIndex(Bits.Zero),
    control: input.bitIndex(Bits.B),
    control2: input.bitIndex(Bits.CarryIn)
});

adderCircuit.addGate(4, {
    gate: Gates.CNOTGate,
    target: input.bitIndex(Bits.CarryIn),
    control: input.bitIndex(Bits.B)
});

adderCircuit.addGate(5, {
    gate: Gates.CNOTGate,
    target: input.bitIndex(Bits.B),
    control: input.bitIndex(Bits.A)
})
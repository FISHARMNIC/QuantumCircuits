import { ControlledGate } from "./ControlledGate.js";
import { Gate } from "./Gate.js";
import { complex, i, minus_i, type Complex } from "./Math.js";
 
const XGate: Gate = new Gate([
    [0, 1],
    [1, 0]
]);

const YGate: Gate = new Gate([
    [0, minus_i],
    [i, 0]
]);


const ZGate: Gate = new Gate([
    [1, 0],
    [0, -1]
]);

const HadamardGate: Gate = new Gate([
    [Math.SQRT1_2, Math.SQRT1_2],
    [Math.SQRT1_2, -Math.SQRT1_2]
]);

const CNOTGate: ControlledGate = new ControlledGate(XGate.operation);
export const CZGate = new ControlledGate(ZGate.operation);
export const CYGate = new ControlledGate(YGate.operation);

export const R2Gate = new ControlledGate([
    [1, 0],
    [0, complex(Math.cos(2 * Math.PI / 4), Math.sin(2 * Math.PI / 4))]
] as Complex[][]);

export const R3Gate = new ControlledGate([
    [1, 0],
    [0, complex(Math.cos(2 * Math.PI / 8), Math.sin(2 * Math.PI / 8))]
] as Complex[][]);

export const R4Gate = new ControlledGate([
    [1, 0],
    [0, complex(Math.cos(2 * Math.PI / 16), Math.sin(2 * Math.PI / 16))]
] as Complex[][]);


export const Gates = {
    XGate,
    YGate,
    ZGate,
    HadamardGate,
    CNOTGate,
    CZGate,
    CYGate,
    R2Gate,
    R3Gate,
    R4Gate
};

export const UtilGates = {
    IdentityGate: new Gate([
        [1, 0],
        [0, 1]
    ]),
    ZeroProjector: new Gate([
        [1, 0],
        [0, 0]
    ]),
    OneProjector: new Gate([
        [0, 0],
        [0, 1]
    ]),
};

//@ts-ignore
window._Gates = Gates;


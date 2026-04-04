import { ControlledGate } from "./ControlledGate.js";
import { Gate } from "./Gate.js";
import { i, minus_i } from "./Math.js";
const XGate = new Gate([
    [0, 1],
    [1, 0]
]);
const YGate = new Gate([
    [0, minus_i],
    [i, 0]
]);
const ZGate = new Gate([
    [1, 0],
    [0, -1]
]);
const HadamardGate = new Gate([
    [Math.SQRT1_2, Math.SQRT1_2],
    [Math.SQRT1_2, -Math.SQRT1_2]
]);
const CNOTGate = new ControlledGate(XGate.operation);
export const Gates = {
    XGate,
    YGate,
    ZGate,
    HadamardGate,
    CNOTGate
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

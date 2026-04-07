import { ControlledGate } from "./ControlledGate.js";
import { Gate } from "./Gate.js";
import { UtilGates } from "./GateExports.js";
import { outputWrite } from "./Html.js";
import { add, identity, multiply, subtract } from "./Math.js";
import { State } from "./State.js";
import { TensorProduct } from "./Tensor.js";
export class Circuit {
    initialState;
    gates;
    highestTime = 0;
    constructor(initalState) {
        this.initialState = initalState;
        this.gates = {};
    }
    addGate(time, gateInfo) {
        if (time <= 0) {
            throw new Error('Time must be positive');
        }
        if (!(time in this.gates)) {
            this.gates[time] = [gateInfo];
        }
        else {
            this.gates[time].push(gateInfo);
        }
        if (time > this.highestTime) {
            this.highestTime = time;
        }
    }
    computeGate(currentState, gateInfo) {
        const { gate, target } = gateInfo;
        const numQubits = currentState.numQubits;
        let fullGate = UtilGates.IdentityGate.operation;
        if (gate instanceof Gate) {
            // Constructs Identity matrix with operation in the middle to operate only on the desired bit
            /*
            (I x I) <- repeat target times -> result
            (result x operation) -> result
            (result x (I x I) <- repeat remaining bits times) -> result

            when target is 0, it just starts with operation then operation x (I x I) <- repeat remaining bits times
            */
            if (target == 0) {
                fullGate = gate.operation;
            }
            else {
                for (let i = 1; i < target; i++) {
                    fullGate = TensorProduct(fullGate, UtilGates.IdentityGate.operation);
                }
                fullGate = TensorProduct(fullGate, gate.operation);
            }
            for (let i = target + 1; i < numQubits; i++) {
                fullGate = TensorProduct(fullGate, UtilGates.IdentityGate.operation);
            }
            const res = multiply(fullGate, currentState.vector);
            return new State(res.toArray());
        }
        else if (gate instanceof ControlledGate) {
            /*
            Similar idea as above
            
            I - (Do nothing behavior) + (Do something behavior)
                -> if not (c1 and c2) then just identity
                -> if c1 (and c2) then remove identity and replace with gate operation
            */
            const control = gateInfo.control;
            const control2 = gateInfo.control2;
            const isToffoli = control2 != undefined;
            const P1 = UtilGates.OneProjector.operation;
            const isControl = (i) => i == control || (isToffoli && i == control2);
            const seedI = isControl(0) ? P1 : UtilGates.IdentityGate.operation;
            let controlWithI = seedI;
            let controlWithGate = seedI;
            for (let i = 1; i < numQubits; i++) {
                if (isControl(i)) {
                    controlWithI = TensorProduct(controlWithI, P1);
                    controlWithGate = TensorProduct(controlWithGate, P1);
                }
                else if (i == target) {
                    controlWithI = TensorProduct(controlWithI, UtilGates.IdentityGate.operation);
                    controlWithGate = TensorProduct(controlWithGate, gate.gate.operation);
                }
                else {
                    controlWithI = TensorProduct(controlWithI, UtilGates.IdentityGate.operation);
                    controlWithGate = TensorProduct(controlWithGate, UtilGates.IdentityGate.operation);
                }
            }
            const identityFull = identity(2 ** numQubits);
            fullGate = add(subtract(identityFull, controlWithI), controlWithGate);
            const res = multiply(fullGate, currentState.vector);
            return new State(res.toArray());
        }
        else {
            throw new Error('Unknown type');
        }
    }
    run() {
        // outputWrite(`Running gates...\n\n***** Initial state: *****\n\n`);
        this.initialState.print(true);
        // outputWrite(`********** END ***********\n\n`);
        let currentState = this.initialState;
        for (let time = 1; time <= this.highestTime; time++) {
            if (!(time in this.gates)) {
                continue;
            }
            else {
                const activeGates = this.gates[time];
                for (const gateInfo of activeGates) {
                    currentState = this.computeGate(currentState, gateInfo);
                    console.log(currentState);
                }
            }
        }
        return currentState;
    }
}

import { ControlledGate, type GateLike } from "./ControlledGate.js";
import { Gate, IdentityGate, OneProjector, ZeroProjector } from "./Gate.js";
import { outputWrite } from "./Html.js";
import { add, multiply, type ComplexMatrix, type ComplexVector } from "./Math.js";
import { State, type StateProbability } from "./State.js";
import { TensorProduct } from "./Tensor.js";

type QubitIndex = number;

export type CircuitGate = {
    gate: GateLike,
    target: QubitIndex,
    control?: QubitIndex,
    control2?: QubitIndex
};

export class Circuit {
    initialState: State;

    gates: Record<number, CircuitGate[]>;
    private highestTime: number = 0;

    constructor(initalState: State) {
        this.initialState = initalState;

        this.gates = {};
    }

    public addGate(time: number, gateInfo: CircuitGate): void {
        if (time <= 0) {
            throw new Error('Time must be positive');
        }

        if (!(time in this.gates)) {
            this.gates[time] = [gateInfo];
        }
        else {
            this.gates[time]!.push(gateInfo);
        }

        if (time > this.highestTime) {
            this.highestTime = time;
        }
    }

    private computeGate(currentState: State, gateInfo: CircuitGate): State {
        const { gate, target } = gateInfo;
        const numQubits = currentState.numQubits;

        let fullGate = IdentityGate.operation;

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
                    fullGate = TensorProduct(fullGate, IdentityGate.operation);
                }
                fullGate = TensorProduct(fullGate, gate.operation);
            }

            for (let i = target + 1; i < numQubits; i++) {
                fullGate = TensorProduct(fullGate, IdentityGate.operation);
            }

            const res = multiply(fullGate, currentState.vector) as ComplexMatrix;
            return new State(res.toArray() as ComplexVector);
        }
        else if (gate instanceof ControlledGate) {
            const control = gateInfo.control!;
            const control2 = gateInfo.control2;
            const isToffoli = control2 != undefined;

            const P0 = ZeroProjector.operation;
            const P1 = OneProjector.operation;

            /*
            Similar idea as above
            
            Identity when control is 0
            Operator on bit when control is 1
            Troffoli: both must be 1

            End combines both
            */

            let zeroPart = control == 0 ? P0 : IdentityGate.operation;
            for (let i = 1; i < numQubits; i++) {
                if (i == control) {
                    zeroPart = TensorProduct(zeroPart, P0);
                }
                else {
                    zeroPart = TensorProduct(zeroPart, IdentityGate.operation);
                }
            }

            let onePart = control == 0 ? P1 : IdentityGate.operation;
            for (let i = 1; i < numQubits; i++) {
                if ((i == control) || (isToffoli && i == control2)) {
                    onePart = TensorProduct(onePart, P1);
                }
                else if (i == target) {
                    onePart = TensorProduct(onePart, gate.gate.operation);
                }
                else {
                    onePart = TensorProduct(onePart, IdentityGate.operation);
                }
            }

            fullGate = add(zeroPart, onePart);

            const res = multiply(fullGate, currentState.vector);

            return new State(res.toArray() as ComplexVector);
        }
        else {
            throw new Error('Unknown type');
        }
    }

    public run(): State {

        outputWrite(`Running gates...\n\n***** Initial state: *****\n\n`);
        this.initialState.print();
        outputWrite(`********** END ***********\n\n`);

        let currentState = this.initialState;

        for (let time = 1; time <= this.highestTime; time++) {
            if (!(time in this.gates)) {
                continue;
            }
            else {
                const activeGates: CircuitGate[] = this.gates[time]!;

                for (const gateInfo of activeGates) {
                    currentState = this.computeGate(currentState, gateInfo);
                }
            }
        }

        return currentState;
    }
}
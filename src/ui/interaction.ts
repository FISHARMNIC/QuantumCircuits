import { BinaryArray } from "../lib/Binary.js";
import { Circuit, type CircuitGate } from "../lib/Circuit.js";
import { ControlledGate, type GateLike } from "../lib/ControlledGate.js";
import { Gates } from "../lib/GateExports.js";
import { allButtons, enableProbs, genDot, outputClear } from "../lib/Html.js";
import { inputProbabilities } from "../lib/Settings.js";
import { State } from "../lib/State.js";
import { gridSize, rowStates, xyToGridId } from "./grid.js";

export let activeGate: string | null = null;

export const gatNameToId = (name: string): string => `gate_${name}`;

let nextClickIsControl: number = 0;

let target: { x: number, y: number } = { x: 0, y: 0 };
let control1: number = 0;

const uiSetActiveGate = (name: string): void => {
    const gate = (Gates as any)[name] as GateLike;

    if (activeGate) {
        const oldGate = (Gates as any)[activeGate] as GateLike | undefined;
        document.getElementById(gatNameToId(activeGate))!.style.backgroundColor = 'white';
    }

    activeGate = name;

    document.getElementById(gatNameToId(activeGate))!.style.backgroundColor = 'lightgray';
}

const uiClearActiveGate = (): void => {
    if (activeGate) {
        document.getElementById(gatNameToId(activeGate))!.style.backgroundColor = 'white';
        activeGate = null;
    }
}

const allGates: Record<string, { time: number, info: CircuitGate } | null> = {};

const mark_valids = (clear: boolean = false): void => {
    allButtons().forEach(e => {
        e.disabled = !clear;
    });

    for (let i = 0; i < gridSize.height; i++) {
        document.getElementById(xyToGridId(target.x, i))!.classList[clear ? 'remove' : 'add']('valid');
    }
}

export const uiClick = (x: number, y: number): void => {
    const el = document.getElementById(xyToGridId(x, y)) as HTMLElement;

    const gate = (Gates as any)[activeGate!] as GateLike;


    if (nextClickIsControl) // selecting control
    {
        if (nextClickIsControl == 2) // selecting second control
        {

            if (target.x != x || target.y == y) {
                alert('Please select the same time instance (shown in green) and a different square');
            }

            else {
                mark_valids(true);

                el.innerHTML = genDot(activeGate!, target.y, y);

                const info: CircuitGate = {
                    gate,
                    target: target.y,
                    control: control1,
                    control2: y
                };

                allGates[xyToGridId(x, target.y)] = { time: x + 1, info };
                nextClickIsControl = 0;

                // uiRun();
            }
        }
        else // selecting target.y
        {
            if (target.x != x || target.y == y) {
                alert('Please select the same time instance (shown in green) and a different square');
            }

            else {
                el.innerHTML = genDot(activeGate!, target.y, y);

                const isTuffoli = prompt('Tuffoli? (y/n)', 'y') == 'y';

                if (isTuffoli) // user wants second control
                {
                    nextClickIsControl = 2;
                    control1 = y;
                }
                else // user wants one control
                {
                    mark_valids(true);

                    const info: CircuitGate = {
                        gate,
                        target: target.y,
                        control: y
                    };

                    allGates[xyToGridId(x, target.y)] = { time: x + 1, info };
                    nextClickIsControl = 0;

                    uiRun();
                }
            }
        }
    }
    else {
        if (activeGate) {
            const isRGate = activeGate[0] == 'R';
            const isCGate = activeGate[0] == 'C';

            el.innerHTML = `<div class="${isRGate ? "circle" : "box"}"><p>${isRGate || isCGate ? activeGate.slice(0, 2) : activeGate[0]}<p></div><hr>`;

            if (gate instanceof ControlledGate) {
                nextClickIsControl = 1;
                target.y = y;
                target.x = x;

                mark_valids();
            }
            else {
                const info: CircuitGate = {
                    gate,
                    target: y,
                };

                console.log({ time: x + 1, info })

                allGates[xyToGridId(x, y)] = { time: x + 1, info };

                // uiRun();
            }
        }
        else {
            el.innerHTML = `<hr>`;
            allGates[xyToGridId(x, y)] = null;
        }
    }
}

export const uiRun = () => {

    console.log(allGates);

    if(enableProbs.checked && inputProbabilities.length != 2 ** gridSize.height)
    {
        alert(`Error! Grid is of size [${2 ** gridSize.height}] but was given [${inputProbabilities.length}] probabilities. Please provide [2 ^ (#qubits=${gridSize.height}) = ${2 ** gridSize.height}]`);
        return;
    }

    const input = new State(enableProbs.checked ? inputProbabilities : new BinaryArray(rowStates));
    const circuit = new Circuit(input);

    console.log(input)

    for (const gate of Object.values(allGates)) {
        if (gate) {
            circuit.addGate(gate.time, gate.info);
        }
    }

    outputClear();

    const result = circuit.run();

    result.print();
}

export const uiHandleRemove = () => {
    Object.entries(allGates).forEach(e => {

        if (!e[0] || !e[1]) {
            return;
        }

        const v = e[1];


        const target_vio = v.info.target >= gridSize.height;

        const c1_exists = v.info.control != undefined;
        const c2_exists = v.info.control2 != undefined;

        const c1_vio = c1_exists && (v.info.control! >= gridSize.height);
        const c2_vio = c2_exists && (v.info.control2! >= gridSize.height);

        if (target_vio || c1_vio || c2_vio) {
            document.getElementById(xyToGridId(v.time - 1, v.info.target))!.innerHTML = `<hr>`;

            if (c1_exists) {
                console.log()
                document.getElementById(xyToGridId(v.time - 1, v.info.control!))!.innerHTML = `<hr>`;
            }

            if (c2_exists) {
                document.getElementById(xyToGridId(v.time - 1, v.info.control2!))!.innerHTML = `<hr>`;
            }

            console.log("deleting", e);
            delete allGates[e[0]];
        }
    })
}
//@ts-ignore
window._uiSetActiveGate = uiSetActiveGate;
//@ts-ignore
window._uiClearActiveGate = uiClearActiveGate;
// @ts-ignore
window._uiRun = uiRun;

window.onclick = uiRun;

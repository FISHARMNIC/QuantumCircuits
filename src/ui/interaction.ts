import { BinaryArray, type Bit } from "../lib/Binary.js";
import { Circuit, type CircuitGate } from "../lib/Circuit.js";
import { ControlledGate, type GateLike } from "../lib/ControlledGate.js";
import { Gates } from "../lib/GateExports.js";
import { outputClear } from "../lib/Html.js";
import { State } from "../lib/State.js";
import { gridSize, ketToId, xyToGridId } from "./grid.js";

export let activeGate: string | null = null;

export const gatNameToId = (name: string): string => `gate_${name}`;

let nextClickIsControl: number = 0;

let target: number = 0;
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

export const uiClick = (x: number, y: number): void => {
    const el = document.getElementById(xyToGridId(x, y)) as HTMLElement;

    if (nextClickIsControl) // selecting control
    {
        const gate = (Gates as any)[activeGate!] as GateLike;

        el.innerHTML = `<div class="dot"></div><hr>`
        if (nextClickIsControl == 2) // selecting second control
        {
            const info: CircuitGate = {
                gate,
                target,
                control: control1,
                control2: y
            };

            allGates[xyToGridId(x, target)] = { time: x + 1, info };
            nextClickIsControl = 0;

            console.log({ time: x + 1, info });
        }
        else // selecting target
        {
            const isTuffoli = prompt('Tuffoli? (y/n)', 'y') == 'y';
            if (isTuffoli) // user wants second control
            {
                nextClickIsControl = 2;
                control1 = y;
            }
            else // user wants one control
            {
                const info: CircuitGate = {
                    gate,
                    target,
                    control: y
                };

                allGates[xyToGridId(x, target)] = { time: x + 1, info };
                nextClickIsControl = 0;

                console.log({ time: x + 1, info });
            }
        }


    }
    else {

        if (activeGate) {
            el.innerHTML = `<div class="box">${activeGate[0]}</div><hr>`;
            const gate = (Gates as any)[activeGate] as GateLike;
            if (gate instanceof ControlledGate) {
                nextClickIsControl = 1;
                target = y;
            }
            else {
                const info: CircuitGate = {
                    gate,
                    target: y,
                };

                console.log({ time: x + 1, info })

                allGates[xyToGridId(x, y)] = { time: x + 1, info };
            }
        }
        else {
            el.innerHTML = `<hr>`;
            allGates[xyToGridId(x, y)] = null;
        }

    }
}

export const uiRun = () => {

    console.log(allGates)

    const arr: Bit[] = [];
    for (let i = 0; i < gridSize.height; i++) {
        arr.push(parseInt(document.getElementById(ketToId(i))!.textContent[1]!) as Bit);
    }

    const input = new State(new BinaryArray(arr));
    const circuit = new Circuit(input);

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
        const k = e[0]!;
        const v = e[1]!;

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

import { BinaryArray } from "../lib/Binary.js";
import { Circuit } from "../lib/Circuit.js";
import { ControlledGate } from "../lib/ControlledGate.js";
import { Gates } from "../lib/GateExports.js";
import { genDot, outputClear } from "../lib/Html.js";
import { State } from "../lib/State.js";
import { gridSize, rowStates, xyToGridId } from "./grid.js";
export let activeGate = null;
export const gatNameToId = (name) => `gate_${name}`;
let nextClickIsControl = 0;
let target = { x: 0, y: 0 };
let control1 = 0;
const uiSetActiveGate = (name) => {
    const gate = Gates[name];
    if (activeGate) {
        const oldGate = Gates[activeGate];
        document.getElementById(gatNameToId(activeGate)).style.backgroundColor = 'white';
    }
    activeGate = name;
    document.getElementById(gatNameToId(activeGate)).style.backgroundColor = 'lightgray';
};
const uiClearActiveGate = () => {
    if (activeGate) {
        document.getElementById(gatNameToId(activeGate)).style.backgroundColor = 'white';
        activeGate = null;
    }
};
const allGates = {};
const mark_valids = (clear = false) => {
    for (let i = 0; i < gridSize.height; i++) {
        document.getElementById(xyToGridId(target.x, i)).classList[clear ? 'remove' : 'add']('valid');
    }
};
export const uiClick = (x, y) => {
    const el = document.getElementById(xyToGridId(x, y));
    const gate = Gates[activeGate];
    if (nextClickIsControl) // selecting control
     {
        if (nextClickIsControl == 2) // selecting second control
         {
            if (target.x != x) {
                alert('Please select the same time instance (shown in green)');
            }
            else {
                mark_valids(true);
                el.innerHTML = genDot(target.y);
                const info = {
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
            if (target.x != x) {
                alert('Please select the same time instance (shown in green)');
            }
            else {
                el.innerHTML = genDot(target.y);
                const isTuffoli = prompt('Tuffoli? (y/n)', 'y') == 'y';
                if (isTuffoli) // user wants second control
                 {
                    nextClickIsControl = 2;
                    control1 = y;
                }
                else // user wants one control
                 {
                    mark_valids(true);
                    const info = {
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
            el.innerHTML = `<div class="box">${activeGate[0]}</div><hr>`;
            if (gate instanceof ControlledGate) {
                nextClickIsControl = 1;
                target.y = y;
                target.x = x;
                mark_valids();
            }
            else {
                const info = {
                    gate,
                    target: y,
                };
                console.log({ time: x + 1, info });
                allGates[xyToGridId(x, y)] = { time: x + 1, info };
                // uiRun();
            }
        }
        else {
            el.innerHTML = `<hr>`;
            allGates[xyToGridId(x, y)] = null;
        }
    }
};
export const uiRun = () => {
    console.log(allGates);
    ;
    const input = new State(new BinaryArray(rowStates));
    const circuit = new Circuit(input);
    for (const gate of Object.values(allGates)) {
        if (gate) {
            circuit.addGate(gate.time, gate.info);
        }
    }
    outputClear();
    const result = circuit.run();
    result.print();
};
export const uiHandleRemove = () => {
    Object.entries(allGates).forEach(e => {
        if (!e[0] || !e[1]) {
            return;
        }
        const v = e[1];
        const target_vio = v.info.target >= gridSize.height;
        const c1_exists = v.info.control != undefined;
        const c2_exists = v.info.control2 != undefined;
        const c1_vio = c1_exists && (v.info.control >= gridSize.height);
        const c2_vio = c2_exists && (v.info.control2 >= gridSize.height);
        if (target_vio || c1_vio || c2_vio) {
            document.getElementById(xyToGridId(v.time - 1, v.info.target)).innerHTML = `<hr>`;
            if (c1_exists) {
                console.log();
                document.getElementById(xyToGridId(v.time - 1, v.info.control)).innerHTML = `<hr>`;
            }
            if (c2_exists) {
                document.getElementById(xyToGridId(v.time - 1, v.info.control2)).innerHTML = `<hr>`;
            }
            console.log("deleting", e);
            delete allGates[e[0]];
        }
    });
};
//@ts-ignore
window._uiSetActiveGate = uiSetActiveGate;
//@ts-ignore
window._uiClearActiveGate = uiClearActiveGate;
// @ts-ignore
window._uiRun = uiRun;
window.onclick = uiRun;

import { Gates } from "../lib/GateExports.js";
import { buttons, formatKet, grid } from "../lib/Html.js";
import { gatNameToId, uiClick, uiHandleRemove, uiRun } from "./interaction.js";
export let gridSize = {
    width: Math.round(window.innerWidth / 110),
    height: 3
};
export const rowStates = [];
export const ketToId = (y) => `ket_id_${y}`;
const makeKetCell = (y) => {
    const ket = document.createElement('td');
    ket.className = 'ket';
    rowStates[y] = rowStates[y] ?? 0;
    ket.innerHTML = formatKet(y, rowStates[y]);
    ket.id = ketToId(y);
    ket.onclick = () => {
        rowStates[y] = rowStates[y] === 0 ? 1 : 0;
        ket.innerHTML = formatKet(y, rowStates[y]);
        // uiRun();
    };
    return ket;
};
export const xyToGridId = (x, y) => `grid_${x}_${y}`;
const makeRow = (y) => {
    const tr = document.createElement('tr');
    tr.appendChild(makeKetCell(y));
    for (let x = 0; x < gridSize.width; x++) {
        const td = document.createElement('td');
        td.id = xyToGridId(x, y);
        td.onclick = () => {
            uiClick(x, y);
        };
        td.innerHTML = `<hr>`;
        tr.appendChild(td);
    }
    return tr;
};
const addRow = () => {
    grid.appendChild(makeRow(gridSize.height));
    gridSize.height++;
    // uiRun();
};
const removeRow = () => {
    if (grid.rows.length > 1) {
        gridSize.height--;
        uiHandleRemove();
        grid.deleteRow(-1);
        rowStates.splice(gridSize.height, 1);
        // uiRun();
    }
};
export const generateGrid = () => {
    for (let y = 0; y < gridSize.height; y++) {
        grid.appendChild(makeRow(y));
    }
    buttons.insertAdjacentHTML('beforeend', `<button onclick='_uiClearActiveGate()'>@Remove</button>`);
    for (const gateName of Object.keys(Gates)) {
        buttons.insertAdjacentHTML('beforeend', `<button id='${gatNameToId(gateName)}' onclick='_uiSetActiveGate("${gateName}")'>${gateName}</button>`);
    }
};
// @ts-ignore
window._addRow = addRow;
// @ts-ignore
window._removeRow = removeRow;

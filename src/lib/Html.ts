import type { Bit } from "./Binary";
import type { Complex } from "./Math";

const outputHtml = document.getElementById('output') as HTMLPreElement;
const outputHtml2 = document.getElementById('output2') as HTMLPreElement;

outputHtml.onclick = (e) => e.stopPropagation();
outputHtml2.onclick = (e) => e.stopPropagation();

export const grid = document.getElementById('grid') as HTMLTableElement;
export const buttons = document.getElementById('buttons') as HTMLDivElement;

export const outputClear = (): void => {outputHtml.innerHTML = '<div class="wrapper dark">Output State</div>'; outputHtml2.innerHTML = '<div class="wrapper dark">Input State</div>'}

export const outputWrite = (s: string, second: boolean = false): void => second? outputHtml2.insertAdjacentHTML('beforeend', s) : outputHtml.insertAdjacentHTML('beforeend', s);

export const genDot = (gateName: string, target_y: number, current_y: number): string => {
    const isR = gateName[0] == 'R';
    const isC = gateName[0] == 'C';
    // const wire_top = current_y > target_y;
    const color = isR? 'cc' : 'cb';

    return `<div class="dot ${color}"></div><pre class='infot'>${target_y} - ${isR || isC ? gateName.slice(0, 2) : gateName[0]}</pre><hr>`;
    // <div class="wire-${wire_top? 'top' : 'bottom'} ${color}"></div>
}

export const formatKet = (n: number, s: Bit | string): string => `<span class='tiny'>(${n})</span><span class='large'>|${s}⟩</span>`;

export const allButtons = () => Array.from(document.getElementsByTagName('button'));

export const enableProbs = document.getElementById('enableProbs') as HTMLInputElement;
export const probsInput = document.getElementById('probsInput') as HTMLInputElement;


export const times = (n: number, v: Complex): Complex[] =>
{
    let o: Complex[] = [];
    for(let i = 0; i < n; i++)
    {
        o.push(v);
    }

    return o;
}

//@ts-ignore
window._times = times;
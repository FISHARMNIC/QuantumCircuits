import type { Bit } from "./Binary";

const outputHtml = document.getElementById('output') as HTMLPreElement;

outputHtml.onclick = (e) => e.stopPropagation();

export const grid = document.getElementById('grid') as HTMLTableElement;
export const buttons = document.getElementById('buttons') as HTMLDivElement;

export const outputClear = (): void => void(outputHtml.innerText = '');

export const outputWrite = (s: string): void => outputHtml.insertAdjacentText('beforeend', s);

export const genDot = (gateName: string, target_y: number, current_y: number): string => {
    const isR = gateName[0] == 'R';
    // const wire_top = current_y > target_y;
    const color = isR? 'cc' : 'cb';

    return `<div class="dot ${color}"></div><pre class='infot'>${target_y} - ${isR ? gateName.slice(0, 2) : gateName[0]}</pre><hr>`;
    // <div class="wire-${wire_top? 'top' : 'bottom'} ${color}"></div>
}

export const formatKet = (n: number, s: Bit): string => `<span class='tiny'>(${n})</span><span class='large'>|${s}⟩</span>`;

export const allButtons = () => Array.from(document.getElementsByTagName('button'));
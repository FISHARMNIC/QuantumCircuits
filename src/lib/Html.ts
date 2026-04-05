import type { Bit } from "./Binary";

const outputHtml = document.getElementById('output') as HTMLPreElement;

outputHtml.onclick = (e) => e.stopPropagation();

export const grid = document.getElementById('grid') as HTMLTableElement;
export const buttons = document.getElementById('buttons') as HTMLDivElement;

export const outputClear = (): void => void(outputHtml.innerText = '');

export const outputWrite = (s: string): void => outputHtml.insertAdjacentText('beforeend', s);

export const genDot = (gateName: string, x: number): string => `<div class="dot"></div><pre class='infot'>${x} - ${gateName[0] == 'R' ? gateName.slice(0, 2) : gateName[0]}</pre><hr>`;

export const formatKet = (n: number, s: Bit): string => `<span class='tiny'>(${n})</span><span class='large'>|${s}⟩</span>`;

export const allButtons = () => Array.from(document.getElementsByTagName('button'));
const outputHtml = document.getElementById('output') as HTMLPreElement;
export const grid = document.getElementById('grid') as HTMLTableElement;
export const buttons = document.getElementById('buttons') as HTMLDivElement;

export const outputClear = (): void => void(outputHtml.innerText = '');

export const outputWrite = (s: string): void => outputHtml.insertAdjacentText('beforeend', s);

export const genDot = (x: number): string => `<div class="dot"></div><pre class='infot'>${x}</pre><hr>`;
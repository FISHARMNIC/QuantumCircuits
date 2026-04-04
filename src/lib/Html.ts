const outputHtml = document.getElementById('output') as HTMLPreElement;
export const grid = document.getElementById('grid') as HTMLTableElement;
export const buttons = document.getElementById('buttons') as HTMLDivElement;

export const outputClear = function(): void {
    outputHtml.innerText = '';
}
export const outputWrite = function(s: string): void {
    outputHtml.insertAdjacentText('beforeend', s);
}
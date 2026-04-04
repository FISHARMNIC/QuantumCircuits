const outputHtml = document.getElementById('output') as HTMLPreElement;

export const outputWrite = function(s: string): void {
    outputHtml.insertAdjacentText('beforeend', s);
}
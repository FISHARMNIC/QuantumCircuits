const outputHtml = document.getElementById('output');
outputHtml.onclick = (e) => e.stopPropagation();
export const grid = document.getElementById('grid');
export const buttons = document.getElementById('buttons');
export const outputClear = () => void (outputHtml.innerText = '');
export const outputWrite = (s) => outputHtml.insertAdjacentText('beforeend', s);
export const genDot = (gateName, target_y, current_y) => {
    const isR = gateName[0] == 'R';
    // const wire_top = current_y > target_y;
    const color = isR ? 'cc' : 'cb';
    return `<div class="dot ${color}"></div><pre class='infot'>${target_y} - ${isR ? gateName.slice(0, 2) : gateName[0]}</pre><hr>`;
    // <div class="wire-${wire_top? 'top' : 'bottom'} ${color}"></div>
};
export const formatKet = (n, s) => `<span class='tiny'>(${n})</span><span class='large'>|${s}⟩</span>`;
export const allButtons = () => Array.from(document.getElementsByTagName('button'));

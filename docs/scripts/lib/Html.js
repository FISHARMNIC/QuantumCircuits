const outputHtml = document.getElementById('output');
outputHtml.onclick = (e) => e.stopPropagation();
export const grid = document.getElementById('grid');
export const buttons = document.getElementById('buttons');
export const outputClear = () => void (outputHtml.innerText = '');
export const outputWrite = (s) => outputHtml.insertAdjacentText('beforeend', s);
export const genDot = (gateName, x) => `<div class="dot"></div><pre class='infot'>${x} - ${gateName[0] == 'R' ? gateName.slice(0, 2) : gateName[0]}</pre><hr>`;
export const formatKet = (n, s) => `<span class='tiny'>(${n})</span><span class='large'>|${s}⟩</span>`;
export const allButtons = () => Array.from(document.getElementsByTagName('button'));

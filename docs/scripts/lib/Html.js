const outputHtml = document.getElementById('output');
export const grid = document.getElementById('grid');
export const buttons = document.getElementById('buttons');
export const outputClear = () => void (outputHtml.innerText = '');
export const outputWrite = (s) => outputHtml.insertAdjacentText('beforeend', s);
export const genDot = (x) => `<div class="dot"></div><pre class='infot'>${x}</pre><hr>`;

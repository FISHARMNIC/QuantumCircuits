const outputHtml = document.getElementById('output');
export const grid = document.getElementById('grid');
export const buttons = document.getElementById('buttons');
export const outputClear = function () {
    outputHtml.innerText = '';
};
export const outputWrite = function (s) {
    outputHtml.insertAdjacentText('beforeend', s);
};

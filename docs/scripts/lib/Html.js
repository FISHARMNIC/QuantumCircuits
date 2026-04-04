const outputHtml = document.getElementById('output');
export const outputWrite = function (s) {
    outputHtml.insertAdjacentText('beforeend', s);
};

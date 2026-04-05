import { gridSize, ketToId, rowStates } from "../ui/grid.js";
import { uiRun } from "../ui/interaction.js";
import { enableProbs, formatKet, grid, probsInput } from "./Html.js";
import { abs, square, i, minus_i, divide, add, subtract, sqrt, multiply, to_complex } from "./Math.js";
export let inputProbabilities = eval(probsInput.value).map(x => to_complex(x));
export const settingsSetup = () => {
    enableProbs.addEventListener('click', (e) => {
        probsInput.disabled = !enableProbs.checked;
        for (let i = 0; i < gridSize.height; i++) {
            document.getElementById(ketToId(i)).innerHTML = formatKet(i, enableProbs.checked ? '~' : rowStates[i]);
        }
        // e.stopPropagation();
    });
    probsInput.addEventListener('click', (e) => e.stopPropagation());
    const enterFn = () => {
        try {
            const probs = eval(probsInput.value).map(x => to_complex(x));
            let sum = 0;
            probs.forEach(n => sum += square(abs(n)));
            if (Math.abs(sum - 1) >= 0.00001) {
                alert(`Error! Absolute square of amplitudes must add up to 1, got [${sum}]`);
            }
            else {
                inputProbabilities = probs;
            }
            uiRun();
        }
        catch (e) {
            alert(`Error! Bad data. Make sure to wrap in array brackets "[]"\n\nJS Error:\n${e}`);
        }
    };
    probsInput.addEventListener('keypress', (e) => {
        if (e.key == 'Enter')
            enterFn();
    });
    probsInput.addEventListener('blur', enterFn);
};

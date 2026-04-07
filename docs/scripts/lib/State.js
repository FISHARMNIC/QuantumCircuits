import { BinaryArray } from "./Binary.js";
import { outputWrite } from "./Html.js";
import { abs, to_complex } from "./Math.js";
/*
Represents |ψ⟩ = Σ (c * state of N qubits)
*/
export class State {
    vector;
    /**
     *
     * @param amplitudes (number? -> initialize n bits to 0) (BinaryArray? -> size bits to value) (ComplexVector? Raw amplitudes MUST BE NORMALIZED)
     */
    constructor(amplitudes) {
        if (typeof amplitudes == 'number') {
            this.vector = new Array(2 ** amplitudes).fill(to_complex(0));
            this.vector[0] = to_complex(1);
        }
        else if (amplitudes instanceof BinaryArray) {
            this.vector = new Array(2 ** amplitudes.bitCount).fill(to_complex(0));
            this.vector[amplitudes.valueOf()] = to_complex(1);
        }
        else {
            this.vector = amplitudes;
        }
    }
    get numQubits() {
        return Math.log2(this.vector.length);
    }
    getProbabilities() {
        const ret = [];
        this.vector.forEach((amplitude, index) => {
            ret.push({
                probability: abs(amplitude) ** 2,
                phase: Math.atan2(amplitude.im, amplitude.re),
                state: BinaryArray.fromNumber(index, this.numQubits)
            });
        });
        return ret;
    }
    bitIndex(n) {
        const bitCount = this.numQubits;
        if (n < bitCount) {
            return n;
        }
        else {
            throw new Error(`Bad index, must be less than or equal to '${bitCount}'`);
        }
    }
    print(start = false, customFormat) {
        const probabilities = this.getProbabilities();
        const possibilities = probabilities.filter((p) => p.probability != 0);
        if (customFormat) {
            possibilities.forEach((p, index) => {
                const formatted = p.state.arr.map((n, i) => `\n\t${customFormat[i] ?? '?'} = ${n}`);
                outputWrite(`State #${index} P = (${(p.probability * 100).toFixed(5)}%), Phase: [${((p.phase) / Math.PI).toFixed(5)}π]:${formatted.join('')}\n\n`);
            });
        }
        else {
            // possibilities.forEach((p: StateProbability, index) => outputWrite(`State #${index} P = (${(p.probability * 100).toFixed(5)}%):\n\tPhase: [${((p.phase) / Math.PI).toFixed(5)}π]\n\tIn state: [${p.state}]\n\n`));
            possibilities.forEach((p, index) => {
                const percent = (p.probability * 100).toFixed(3) + '%';
                const phase = ((p.phase) / Math.PI).toFixed(3) + 'π';
                const state = p.state;
                outputWrite(`<div class='g2'>${start ? "<div class='info infoA'>(Initial)</div>" : ''}<div class='info infoA'>P = ${percent}\n</div><div class='info infoB'>State: |${state}⟩</div><div class='info infoC'>Phase: ${phase}</div></div>${start ? '<br>' : ''}`, start);
                // outputWrite(`State #${index} P = (${(p.probability * 100).toFixed(5)}%):\n\tPhase: [${((p.phase) / Math.PI).toFixed(5)}π]\n\tIn state: [${p.state}]\n\n`)
            });
        }
    }
}

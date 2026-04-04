import { BinaryArray } from "./Binary.js";
import { outputWrite } from "./Html.js";
import { abs, to_complex, type ComplexVector } from "./Math.js";

export type StateProbability = {
    probability: number,
    state: BinaryArray
};

/*
Represents |ψ⟩ = Σ (c * state of N qubits)
*/
export class State {
    vector: ComplexVector;

    /**
     * 
     * @param amplitudes (number? -> initialize n bits to 0) (BinaryArray? -> size bits to value) (ComplexVector? Raw probabilities MUST BE NORMALIZED)
     */
    constructor(amplitudes: ComplexVector | number | BinaryArray) {
        if (typeof amplitudes == 'number') {
            this.vector = new Array(2 ** amplitudes).fill(to_complex(0))
            this.vector[0] = to_complex(1)
        }
        else if (amplitudes instanceof BinaryArray) {
            this.vector = new Array(2 ** amplitudes.bitCount).fill(to_complex(0));
            this.vector[amplitudes.valueOf()] = to_complex(1);
        }
        else {
            this.vector = amplitudes;
        }
    }

    public get numQubits() {
        return Math.log2(this.vector.length)
    }

    public getProbabilities(): StateProbability[] {
        const ret: StateProbability[] = [];

        this.vector.forEach((amplitude, index) => {
            ret.push({
                probability: abs(amplitude) ** 2,
                state: BinaryArray.fromNumber(index, this.numQubits)
            });
        });

        return ret;
    }

    public bitIndex(n: number) {
        const bitCount = this.numQubits;

        if (n < bitCount) {
            return n;
        }
        else {
            throw new Error(`Bad index, must be less than or equal to '${bitCount}'`);
        }
    }

    public print(customFormat?: string[]): void {
        const probabilities = this.getProbabilities();
        const possibilities = probabilities.filter((p: StateProbability) => p.probability != 0);

        if (customFormat) {
            possibilities.forEach((p: StateProbability, index) => {
                const formatted = p.state.arr.map((n, i) => `\n\t${customFormat[i] ?? '?'} = ${n}`);
                outputWrite(`Result #${index} (${p.probability * 100}%):${formatted.join('')}\n\n`)
            });
        }
        else {
            possibilities.forEach((p: StateProbability) => outputWrite(`Result (${p.probability * 100}%): ${p.state}\n\n`));
        }
    }
}
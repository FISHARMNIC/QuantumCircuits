import { matrix, to_complex } from "./Math.js";
export class Qubit {
    alpha; // how much in 0 state
    beta; // how much in 1 state
    constructor(alpha, beta) {
        this.alpha = to_complex(alpha);
        this.beta = to_complex(beta);
    }
    get matrix() {
        return matrix([this.alpha, this.beta]);
    }
    static Zero() {
        return new Qubit(1, 0);
    }
    static One() {
        return new Qubit(0, 1);
    }
}

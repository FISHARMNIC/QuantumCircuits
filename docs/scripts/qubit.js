function to_complex(n) {
    return typeof (n) == 'number' ? math.complex(n, 0) : n;
}
export class Qubit {
    alpha; // how much in 0 state
    beta; // how much in 1 state
    constructor(alpha, beta) {
        this.alpha = to_complex(alpha);
        this.beta = to_complex(beta);
    }
    static Zero() {
        return new Qubit(1, 0);
    }
    static One() {
        return new Qubit(0, 1);
    }
}

import { matrix, to_complex, type Complex, type ComplexMatrix } from "./Math.js";

export class Qubit
{
    alpha: Complex; // how much in 0 state
    beta:  Complex; // how much in 1 state

    constructor(alpha: Complex | number, beta: Complex | number)
    {
        this.alpha = to_complex(alpha);
        this.beta =  to_complex(beta);
    }

    public get matrix(): ComplexMatrix
    {
        return matrix([this.alpha, this.beta]) as ComplexMatrix
    }

    public static Zero(): Qubit
    {
        return new Qubit(1, 0);
    }

    public static One(): Qubit
    {
        return new Qubit(0, 1);
    }
}
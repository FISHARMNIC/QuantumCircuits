export declare const math: typeof import("mathjs");

export type Complex = math.Complex;
export const MathMatrix = math.Matrix;
export type ComplexMatrix = math.Matrix<Complex>;
export type ComplexVector = Complex[];

export const to_complex = (n: Complex | number): Complex => typeof(n) == 'number' ? math.complex(n, 0) : n;

export const minus_i = math.multiply(math.i, -1);

export const {kron, multiply, add, subtract, divide, i, matrix, abs, identity, complex, sqrt, square} = math;
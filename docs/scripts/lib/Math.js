export const MathMatrix = math.Matrix;
export const to_complex = (n) => typeof (n) == 'number' ? math.complex(n, 0) : n;
export const minus_i = math.multiply(math.i, -1);
export const { kron, multiply, add, subtract, divide, i, matrix, abs, identity, complex } = math;

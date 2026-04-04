import { kron, type ComplexMatrix } from "./Math.js";

export const TensorProduct = (a: ComplexMatrix, b: ComplexMatrix): ComplexMatrix => kron(a, b) as ComplexMatrix;
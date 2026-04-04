export class BinaryArray {
    arr;
    constructor(n) {
        this.arr = n;
    }
    static fromNumber(n, numbits) {
        return new BinaryArray(n.toString(2).padStart(numbits, '0').split('').map(Number));
    }
    toString() {
        return this.arr.join('');
    }
    valueOf() {
        return parseInt(this.toString(), 2);
    }
    get bitCount() {
        return this.arr.length;
    }
    getBit(n) {
        return this.arr[n];
    }
}

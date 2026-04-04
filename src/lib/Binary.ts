export type BitOne = 1;
export type BitZero = 0;

export type Bit = BitOne | BitZero;

export class BinaryArray
{
    arr: number[];

    constructor(n: Bit[])
    {
        this.arr = n;
    }

    public static fromNumber(n: number, numbits: number): BinaryArray {
        return new BinaryArray(n.toString(2).padStart(numbits, '0').split('').map(Number) as Bit[]);
    }

    public toString(): string
    {
        return this.arr.join('');
    }

    public valueOf(): number
    {
        return parseInt(this.toString(), 2);
    }

    public get bitCount(): number
    {
        return this.arr.length;
    }

    public getBit(n: number)
    {
        return this.arr[n];
    }

}
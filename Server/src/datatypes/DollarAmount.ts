import { assert } from "console";

export class DollarAmount {
    value: number;

    static Scale(): number {
        return 100;
    }

    constructor(value: number) {
        this.value = value;
        console.assert(this.isValid(), `Invalid DollarAmount in constructor: ${this}`);
    }

    add(other: DollarAmount) {
        this.value += other.value;
    }

    subtract(other: DollarAmount) {
        this.value -= other.value;
        console.assert(this.isValid(), `Invalid DollarAmount in subtract: ${this}`);
    }

    isGreater(other: DollarAmount) {
        return !(this.isLess(other) || this.isEqual(other));
    }

    isLess(other: DollarAmount) {
        return this.value < other.value;
    }

    isEqual(other: DollarAmount) {
        return this.value == other.value;
    }

    getAsUnscaledFloat(): number {
        return this.value / DollarAmount.Scale();
    }

    // e.g., converts 1553 to "$15.53"
    toString(): string {
        return `\$${this.getAsUnscaledFloat()}`;
    }

    isValid(): boolean {
        return Number.isInteger(this.value)
            && this.value >= 0;
    }

    isEmpty(): boolean {
        return this.value == 0;
    }
}

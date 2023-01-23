import { DollarAmount } from "./DollarAmount";
import { Line } from "./Line";

export class LineDollarAmountPair {
    line: Line
    dollarAmount: DollarAmount

    constructor(line: Line, dollarAmount: DollarAmount) {
        this.line = line;
        this.dollarAmount = dollarAmount;
    }

    toString() {
        return `{ Line: ${this.line}, DollarAmount: ${this.dollarAmount} }`;
    }
}

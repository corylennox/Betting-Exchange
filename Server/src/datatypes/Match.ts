import { DollarAmount } from "./DollarAmount";
import { Line } from "./Line";
import { LineDollarAmountPair } from "./LineDollarAmountPair";
import { Side, sideFlip } from "./Side";

export class Match {
    aggressiveBetId: bigint;
    passiveBetId: bigint;
    aggressiveSide: Side;
    aggressiveWager: LineDollarAmountPair;
    passiveWager: LineDollarAmountPair; // the match's line will always be made at the passive line, not the aggressive line.
    aggressiveFullyFilled: boolean;
    passiveFullyFilled: boolean;

    constructor(aggressiveBetId: bigint, passiveBetId: bigint, aggressiveSide: Side, aggressiveWager: LineDollarAmountPair, passiveWager: LineDollarAmountPair,
        aggressiveFullyFilled: boolean, passiveFullyFilled: boolean) {
        this.aggressiveBetId = aggressiveBetId;
        this.passiveBetId = passiveBetId;
        this.aggressiveSide = aggressiveSide;
        this.aggressiveWager = aggressiveWager;
        this.passiveWager = passiveWager;
        this.aggressiveFullyFilled = aggressiveFullyFilled;
        this.passiveFullyFilled = passiveFullyFilled;
    }

    getAggressiveBetId(): bigint {
        return this.aggressiveBetId;
    }

    getPassiveBetId(): bigint {
        return this.passiveBetId;
    }

    getAggressiveSide(): Side {
        return this.aggressiveSide;
    }

    getPassiveSide(): Side {
        return sideFlip(this.aggressiveSide);
    }

    getAggressiveWager(): LineDollarAmountPair {
        return this.aggressiveWager;
    }

    getPassiveWager(): LineDollarAmountPair {
        return this.passiveWager;
    }

    isAggressiveFullyFilled(): boolean {
        return this.aggressiveFullyFilled;
    }

    isPassiveFullyFilled(): boolean {
        return this.passiveFullyFilled;
    }

    toString() {
        return `{ Aggressive: {betId: ${this.aggressiveBetId}, wager: ${this.aggressiveWager}, side: ${this.aggressiveSide}, fullyFilled: ${this.aggressiveFullyFilled}}, Passive: {betId: ${this.passiveBetId}, wager: ${this.passiveWager}, fullyFilled: ${this.passiveFullyFilled}} }`
    }
}

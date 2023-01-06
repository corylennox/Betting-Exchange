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

    constructor(aggressiveBetId: bigint, passiveBetId: bigint, aggressiveSide: Side, aggressiveWager: LineDollarAmountPair, passiveWager: LineDollarAmountPair) {
        this.aggressiveBetId = aggressiveBetId;
        this.passiveBetId = passiveBetId;
        this.aggressiveSide = aggressiveSide;
        this.aggressiveWager = aggressiveWager;
        this.passiveWager = passiveWager;
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

    toString() {
        return `{ Aggressive: {betId: ${this.aggressiveBetId}, wager: ${this.aggressiveWager}, side: ${this.aggressiveSide}}, Passive: {betId: ${this.passiveBetId}, wager: ${this.passiveWager}} }`
    }
}

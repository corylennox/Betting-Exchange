import { BookSide } from "./BookSide";
import { LineType } from "./Line";
import { Side } from "./Side";
import { LineDollarAmountPair } from '../datatypes/LineDollarAmountPair'
import { Match } from "./Match";
import { assert } from "console";
import { DollarAmount } from "./DollarAmount";
import { RestingType } from "./RestingType";
import { cloneable } from "../utils/cloneable";

export class Book {
    lineType: LineType;
    bid: BookSide;
    ask: BookSide;

    constructor(lineType: LineType, bid: BookSide, ask: BookSide) {
        this.lineType = lineType;
        this.bid = bid;
        this.ask = ask;
    }

    addBet(side: Side, betId: bigint, lineDollarAmountPair: LineDollarAmountPair, restingType: RestingType): Array<Match> | boolean {
        if (lineDollarAmountPair.line.getType() != this.lineType) {
            assert(false, `Line Types have to be the same. Book line type is ${this.lineType} while given line is ${lineDollarAmountPair}`);
            return false;
        }

        // Check if the other side has any matchable bets
        const matches = side == Side.Bid ? this.ask.tryMatch(betId, cloneable.deepCopy(lineDollarAmountPair)) : this.bid.tryMatch(betId, cloneable.deepCopy(lineDollarAmountPair));
        let matchedAggressiveDollarAmount = new DollarAmount(0);
        for (let i = 0; i < matches.length; i++) {
            matchedAggressiveDollarAmount.add(matches[i].getAggressiveWager().dollarAmount);
        }

        // Add whatever leftover amount was unmatched to the 
        let remainingAggressiveWager = new LineDollarAmountPair(lineDollarAmountPair.line, new DollarAmount(lineDollarAmountPair.dollarAmount.value));
        remainingAggressiveWager.dollarAmount.subtract(matchedAggressiveDollarAmount);
        assert(remainingAggressiveWager.dollarAmount.isValid(), `Invalid remaining wager: ${remainingAggressiveWager}`);
        if (restingType == RestingType.Limit && !remainingAggressiveWager.dollarAmount.isEmpty()) {
            if (side == Side.Bid) {
                this.bid.addBet(betId, remainingAggressiveWager);
            }
            else if (side == Side.Ask) {
                this.ask.addBet(betId, remainingAggressiveWager);
            }
        }

        return matches;
    }

    getLineType(): LineType {
        return this.lineType;
    }

    toString(): String {
        return `{ lineType: ${this.lineType}, bids: ${this.bid}, asks: ${this.ask} }`
    }
}

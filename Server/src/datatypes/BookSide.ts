import { assert } from "console";
import { Line, MoneyLine } from './Line';
import { Side, sideFlip } from './Side';
import { DollarAmount } from './DollarAmount';
import { LineDollarAmountPair } from "./LineDollarAmountPair";
import { convertLineToProbability, convertProbabilityToLine } from "bettingexchangecommon/lineUtils";
import { determineWager, determineWin } from "bettingexchangecommon/wagerWinUtils";
import { cloneable } from '../utils/cloneable';
import { Match } from "./Match";

class BookEntry {
    betId: bigint; // same as betId stored in database
    wager: DollarAmount;
    line: Line;

    constructor(betId: bigint, wager: DollarAmount, line: Line) {
        this.betId = betId;
        this.wager = wager;
        this.line = line;
    }

    getTotal(): DollarAmount {
        const result = new DollarAmount(this.wager.value);
        result.add(new DollarAmount(determineWin(this.line.getAsLegacyLine(), this.wager)));
        return result;
    }

    toString(): String {
        return `{ betId: ${this.betId}, wager: ${this.wager}, line: ${this.line} }`
    }
}

class BookLevel {
    entries: Array<BookEntry>;
    line: Line

    constructor(line: Line) {
        this.entries = [];
        this.line = line;
    }

    addBet(betId: bigint, lineDollarAmountPair: LineDollarAmountPair) {
        this.entries.push(new BookEntry(betId, lineDollarAmountPair.dollarAmount, lineDollarAmountPair.line));
    }

    match(aggressingBetId: bigint, aggressingSide: Side, aggressingWager: LineDollarAmountPair): Array<Match> {
        let matches = new Array<Match>();
        for (let i = 0; i < this.entries.length; i++) {
            // If the aggressing wager has been depleted, cannot match any further
            if (aggressingWager.dollarAmount.isEmpty()) {
                break;
            }

            let entry = this.entries[i];

            // aggressing orders get to use the potentially better passive line than the aggresive line
            const aggressingDesiredWin = new DollarAmount(determineWager(entry.line.getAsLegacyLine(), aggressingWager.dollarAmount.value));
            let matchedPassiveWager: DollarAmount;
            let matchedAggressiveWager: DollarAmount;
            let matchedPassiveWagerFullyFilled = false;
            if (aggressingDesiredWin.isGreater(entry.wager) || aggressingDesiredWin.isEqual(entry.wager)) {
                matchedPassiveWager = new DollarAmount(entry.wager.value);
                matchedAggressiveWager = new DollarAmount(determineWin(entry.line.getAsLegacyLine(), entry.wager.value));
                this.entries.shift(); // drop entry from matches
                i -= 1;
                matchedPassiveWagerFullyFilled = true;
            }
            else {
                matchedPassiveWager = aggressingDesiredWin;
                matchedAggressiveWager = new DollarAmount(aggressingWager.dollarAmount.value);
                entry.wager.subtract(matchedPassiveWager);
            }

            aggressingWager.dollarAmount.subtract(matchedAggressiveWager);
            matches.push(new Match(aggressingBetId, entry.betId, aggressingSide,
                new LineDollarAmountPair(aggressingWager.line, matchedAggressiveWager),
                new LineDollarAmountPair(entry.line, matchedPassiveWager),
                aggressingWager.dollarAmount.isEmpty(),
                matchedPassiveWagerFullyFilled));
            return matches;
        }
    }

    getDollarAmount(): DollarAmount {
        let result = new DollarAmount(0);
        this.entries.forEach((entry: BookEntry) => {
            result.add(entry.wager);
        })
        return result;
    }

    getInfo(): LineDollarAmountPair {
        return new LineDollarAmountPair(this.line, this.getDollarAmount());
    }

    toString(): String {
        return `{ line: ${this.line}, entries: [ ${this.entries} ] }`
    }
}

export abstract class BookSide {
    side: Side;

    constructor(side: Side) {
        this.side = side;
    }

    abstract addBet(betId: bigint, lineDollarAmountPair: LineDollarAmountPair): void;
    abstract tryMatch(aggressingBetId: bigint, aggressingWager: LineDollarAmountPair): Array<Match>;
    abstract getLevels(maxDepth: number): Array<LineDollarAmountPair>;
    abstract toString(): String;
}

export class ExplicitBookSide extends BookSide {
    levels: Array<BookLevel>;

    constructor(side: Side) {
        super(side);
        this.levels = [];
    }

    addBet(betId: bigint, lineDollarAmountPair: LineDollarAmountPair) {
        let i = 0;
        for (i = 0; i < this.levels.length; i++) {
            if (lineDollarAmountPair.line.isEqual(this.levels[i].line)) {
                this.levels[i].addBet(betId, lineDollarAmountPair);
                return;
            }
            else if (lineDollarAmountPair.line.isMoreAggressive(this.side, this.levels[i].line)) {
                break;
            }
        }
        let newBookLevel = new BookLevel(lineDollarAmountPair.line);
        newBookLevel.addBet(betId, lineDollarAmountPair);
        this.levels.splice(i, 0, newBookLevel); // add the new bet at the given index where it was determined to insert
    }

    tryMatch(aggressingBetId: bigint, aggressingWager: LineDollarAmountPair): Array<Match> {
        let matches = new Array<Match>();
        for (let i = 0; i < this.levels.length; i++) {
            let level = this.levels[i];
            if (level.line.canMatchAgainst(sideFlip(this.side) /* aggressing side */, aggressingWager.line)) {
                const levelMatches = level.match(aggressingBetId, sideFlip(this.side), aggressingWager);
                matches.push(...levelMatches);
            }
            if (level.entries.length == 0) {
                this.levels.shift(); // drop empty level
                i -= 1;
            }
        }
        return matches;
    }

    getLevels(maxDepth: number = 10): Array<LineDollarAmountPair> {
        let levels = new Array<LineDollarAmountPair>();
        for (let i = 0; i < maxDepth && i < this.levels.length; i++) {
            levels.push(this.levels[i].getInfo());
        }
        return levels;
    }

    toString(): String {
        return `{ side: ${this.side}, levels: [ ${this.levels} ] }`
    }
}

export class ImplicitOutrightBookSide extends BookSide {
    implicativeBookSides: Array<BookSide>;

    constructor(side: Side, implicativeBookSides: Array<BookSide>) {
        super(side);
        this.implicativeBookSides = implicativeBookSides;
        this.implicativeBookSides.forEach((implicativeBookSide) => {
            assert(implicativeBookSide.side != side, `A ${implicativeBookSide.side} book cannot imply into a ${side} book`);
        })
    }

    addBet(betId: bigint, lineDollarAmountPair: LineDollarAmountPair) {
        assert(false, "Not supported");
    }

    tryMatch(aggressingBetId: bigint, aggressingWager: LineDollarAmountPair): Array<Match> {
        assert(false, "Not supported, yet!");
        return new Array<Match>();
    }

    getLevels(maxDepth: number = 10): Array<LineDollarAmountPair> {
        const numBooks = this.implicativeBookSides.length;

        // indexed by [bookIndex, levelIndex]
        let implicativeBookLevels = new Array<Array<LineDollarAmountPair>>();
        this.implicativeBookSides.forEach((impliedBookSide: BookSide) => {
            implicativeBookLevels.push(impliedBookSide.getLevels(maxDepth));
        });

        // make a deep copy of the implicativeBookLevels so that the other books don't get modified
        implicativeBookLevels = cloneable.deepCopy(implicativeBookLevels);

        let impliedBookLevels = new Array<LineDollarAmountPair>();
        let exhaustedBookDepths = new Array<number>(numBooks).fill(0); // keeps track of the depth of each implicativeBookLevels that has been exhausted
        while (impliedBookLevels.length < maxDepth) {
            let topImplicativeBookLevels = new Array<LineDollarAmountPair>(); // numBooks size
            for (let bookIndex = 0; bookIndex < numBooks; bookIndex++) {
                topImplicativeBookLevels.push(implicativeBookLevels[bookIndex][exhaustedBookDepths[bookIndex]]);
            }

            // Determines the cumulative probability of all the implicative bets.
            // Also determines the minimum DollarAmount available to match at all implicative bets.
            let cumulativeOpposingProbability: number = 0;
            let minImplicativeDollarAmount = new DollarAmount(Number.MAX_SAFE_INTEGER);
            for (let bookIndex = 0; bookIndex < numBooks; bookIndex++) {
                // check if implicativeBookLevels[bookIndex] is exhausted
                if (exhaustedBookDepths[bookIndex] == implicativeBookLevels[bookIndex].length) {
                    continue;
                }

                cumulativeOpposingProbability += convertLineToProbability(topImplicativeBookLevels[bookIndex].line.getAsUnscaledFloat());
                if (topImplicativeBookLevels[bookIndex].dollarAmount.isLess(minImplicativeDollarAmount)) {
                    minImplicativeDollarAmount = cloneable.deepCopy(topImplicativeBookLevels[bookIndex].dollarAmount);
                }
            }
            // Check if there is no remaining liquidity from the implicative books, in which case we must return
            if (cumulativeOpposingProbability == 0) {
                break;
            }
            assert(cumulativeOpposingProbability < 1);

            // Remove the "traded" qty and mark any exhausted levels as exhausted
            let numNonExhaustedBooks = implicativeBookLevels.length;
            for (let bookIndex = 0; bookIndex < numBooks; bookIndex++) {
                // check if implicativeBookLevels[bookIndex] is exhausted
                if (exhaustedBookDepths[bookIndex] == implicativeBookLevels[bookIndex].length) {
                    numNonExhaustedBooks -= 1;
                    continue;
                }

                if (topImplicativeBookLevels[bookIndex].dollarAmount.isEqual(minImplicativeDollarAmount)) {
                    exhaustedBookDepths[bookIndex] += 1;
                }
                topImplicativeBookLevels[bookIndex].dollarAmount.subtract(minImplicativeDollarAmount);
            }

            // Calculate the line available given the implicative books
            const availableProbability = 1 - cumulativeOpposingProbability;
            const unscaledLine = convertProbabilityToLine(availableProbability);
            const impliedLine = MoneyLine.RoundToLessAggressive(unscaledLine, this.side);
            // If the user bidding into the implied book wins, they will win the minImplicativeDollarAmount
            const impliedAvailableWin = minImplicativeDollarAmount.value * numNonExhaustedBooks;
            const impliedAvailableWager = determineWager({type: "MoneyLine", value: impliedLine.getAsUnscaledFloat()}, impliedAvailableWin);
            const impliedQty = new DollarAmount(impliedAvailableWager);

            // There are certain scenarios (I believe) in which the line here can be the same as the prev line, in which case collapse the two buckets
            if (impliedBookLevels.length > 0 && impliedBookLevels[impliedBookLevels.length - 1].line.isEqual(impliedLine)) {
                impliedBookLevels[implicativeBookLevels.length - 1].dollarAmount.add(impliedQty);
            }
            else {
                impliedBookLevels.push(new LineDollarAmountPair(impliedLine, impliedQty));
            }
        }

        return impliedBookLevels;
    }

    toString(): String {
        assert(false, "Not implemented yet");
        return "";
    }
}

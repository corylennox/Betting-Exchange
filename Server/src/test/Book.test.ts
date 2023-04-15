import { Side } from "../datatypes/Side";
import { ExplicitBookSide } from "../datatypes/BookSide";
import { Book } from "../datatypes/Book";
import { LineType, Line, MoneyLine } from '../datatypes/Line';
import { DollarAmount } from '../datatypes/DollarAmount';
import { LineDollarAmountPair } from '../datatypes/LineDollarAmountPair'
import { RestingType } from "../datatypes/RestingType";

const bid = Side.Bid;
const ask = Side.Ask;

test('Test crossing a MoneyLine Book using limit orders', () => {
    const bids = new ExplicitBookSide(Side.Bid);
    const asks = new ExplicitBookSide(Side.Ask);
    const book = new Book(LineType.Money, bids, asks);

    const betId1 = BigInt(0);
    const line1 = new MoneyLine(-3400);
    const dollarAmount1 = new DollarAmount(100);
    const addBetResult1 = book.addBet(bid, betId1, new LineDollarAmountPair(line1, dollarAmount1), RestingType.Limit);
    expect(addBetResult1[0].length).toBe(0);

    const betId2 = BigInt(0);
    const line2 = new MoneyLine(+3410);
    const dollarAmount2 = new DollarAmount(5);
    const addBetResult2 = book.addBet(ask, betId2, new LineDollarAmountPair(line2, dollarAmount2), RestingType.Limit);
    expect(addBetResult2[0].length).toBe(0);

    const betId3 = BigInt(0);
    const line3 = new MoneyLine(+3400);
    const dollarAmount3 = new DollarAmount(5);
    const addBetResult3 = book.addBet(ask, betId3, new LineDollarAmountPair(line3, dollarAmount3), RestingType.Limit);
    expect(addBetResult3[0].length).toBe(1);

    const betId4 = BigInt(0);
    const line4 = new MoneyLine(+3390);
    const dollarAmount4 = new DollarAmount(5);
    const addBetResult4 = book.addBet(ask, betId4, new LineDollarAmountPair(line4, dollarAmount4), RestingType.Limit);
    expect(addBetResult4[0].length).toBe(1);

})

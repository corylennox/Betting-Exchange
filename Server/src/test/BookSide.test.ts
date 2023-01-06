import { ImplicitOutrightBookSide, ExplicitBookSide } from '../datatypes/BookSide';
import { Side } from '../datatypes/Side'
import { LineDollarAmountPair } from '../datatypes/LineDollarAmountPair'
import { Line, MoneyLine } from '../datatypes/Line';
import { DollarAmount } from '../datatypes/DollarAmount';

const betId = BigInt(0);

test('Test adding positive and negative lines to a Bid ExplicitBookSide', () => {
    let bookSide = new ExplicitBookSide(Side.Bid);
    expect(bookSide.getLevels().length).toBe(0)

    const line1 = new MoneyLine(-10000);
    const dollarAmount1 = new DollarAmount(100);
    bookSide.addBet(betId, new LineDollarAmountPair(line1, dollarAmount1));
    expect(bookSide.getLevels().length).toBe(1);
    expect(bookSide.getLevels()[0].line.isEqual(line1)).toBe(true);
    expect(bookSide.getLevels()[0].dollarAmount.isEqual(dollarAmount1)).toBe(true);

    // less aggressive than line1
    const line2 = new MoneyLine(+4500);
    const dollarAmount2 = new DollarAmount(650);
    bookSide.addBet(betId, new LineDollarAmountPair(line2, dollarAmount2));
    expect(bookSide.getLevels().length).toBe(2);
    expect(bookSide.getLevels()[1].line.isEqual(line2)).toBe(true);
    expect(bookSide.getLevels()[1].dollarAmount.isEqual(dollarAmount2)).toBe(true);

    // more aggressive than line1
    const line3 = new MoneyLine(-15000);
    const dollarAmount3 = new DollarAmount(2);
    bookSide.addBet(betId, new LineDollarAmountPair(line3, dollarAmount3));
    expect(bookSide.getLevels().length).toBe(3);
    expect(bookSide.getLevels()[0].line.isEqual(line3)).toBe(true);
    expect(bookSide.getLevels()[0].dollarAmount.isEqual(dollarAmount3)).toBe(true);

    // less aggressive than line1, more aggressive than line2
    const line4 = new MoneyLine(+1100);
    const dollarAmount4 = new DollarAmount(345);
    bookSide.addBet(betId, new LineDollarAmountPair(line4, dollarAmount4));
    expect(bookSide.getLevels().length).toBe(4);
    expect(bookSide.getLevels()[2].line.isEqual(line4)).toBe(true);
    expect(bookSide.getLevels()[2].dollarAmount.isEqual(dollarAmount4)).toBe(true);

    // equal to aggressiveness of line1
    const line5 = new MoneyLine(-10000);
    const dollarAmount5 = new DollarAmount(50);
    bookSide.addBet(betId, new LineDollarAmountPair(line5, dollarAmount5));
    expect(bookSide.getLevels().length).toBe(4);
    expect(bookSide.getLevels()[1].line.isEqual(line1)).toBe(true);
    expect(bookSide.getLevels()[1].line.isEqual(line5)).toBe(true);
    let aggDollarAmount = new DollarAmount(0);
    aggDollarAmount.add(dollarAmount1);
    aggDollarAmount.add(dollarAmount5);
    expect(bookSide.getLevels()[1].dollarAmount.isEqual(aggDollarAmount)).toBe(true);
})

test('Test adding positive and negative lines to an Ask ExplicitBookSide', () => {
    let bookSide = new ExplicitBookSide(Side.Ask);
    expect(bookSide.getLevels().length).toBe(0)

    const line1 = new MoneyLine(-10000);
    const dollarAmount1 = new DollarAmount(100);
    bookSide.addBet(betId, new LineDollarAmountPair(line1, dollarAmount1));
    expect(bookSide.getLevels().length).toBe(1);
    expect(bookSide.getLevels()[0].line.isEqual(line1)).toBe(true);
    expect(bookSide.getLevels()[0].dollarAmount.isEqual(dollarAmount1)).toBe(true);

    // more aggressive than line1
    const line2 = new MoneyLine(+4500);
    const dollarAmount2 = new DollarAmount(650);
    bookSide.addBet(betId, new LineDollarAmountPair(line2, dollarAmount2));
    expect(bookSide.getLevels().length).toBe(2);
    expect(bookSide.getLevels()[0].line.isEqual(line2)).toBe(true);
    expect(bookSide.getLevels()[0].dollarAmount.isEqual(dollarAmount2)).toBe(true);

    // less aggressive than line1
    const line3 = new MoneyLine(-15000);
    const dollarAmount3 = new DollarAmount(2);
    bookSide.addBet(betId, new LineDollarAmountPair(line3, dollarAmount3));
    expect(bookSide.getLevels().length).toBe(3);
    expect(bookSide.getLevels()[2].line.isEqual(line3)).toBe(true);
    expect(bookSide.getLevels()[2].dollarAmount.isEqual(dollarAmount3)).toBe(true);

    // more aggressive than line1, less aggressive than line2
    const line4 = new MoneyLine(+1100);
    const dollarAmount4 = new DollarAmount(345);
    bookSide.addBet(betId, new LineDollarAmountPair(line4, dollarAmount4));
    expect(bookSide.getLevels().length).toBe(4);
    expect(bookSide.getLevels()[1].line.isEqual(line4)).toBe(true);
    expect(bookSide.getLevels()[1].dollarAmount.isEqual(dollarAmount4)).toBe(true);

    // equal to aggressiveness of line1
    const line5 = new MoneyLine(-10000);
    const dollarAmount5 = new DollarAmount(50);
    bookSide.addBet(betId, new LineDollarAmountPair(line5, dollarAmount5));
    expect(bookSide.getLevels().length).toBe(4);
    expect(bookSide.getLevels()[2].line.isEqual(line1)).toBe(true);
    expect(bookSide.getLevels()[2].line.isEqual(line5)).toBe(true);
    let aggDollarAmount = new DollarAmount(0);
    aggDollarAmount.add(dollarAmount1);
    aggDollarAmount.add(dollarAmount5);
    expect(bookSide.getLevels()[2].dollarAmount.isEqual(aggDollarAmount)).toBe(true);
})

test('Test adding lines to 3 Bid ExplicitBookSides that imply into an Ask ImplicitOutrightBookSide', () => {
    let bookSide1 = new ExplicitBookSide(Side.Bid);
    {
    const line1 = new MoneyLine(+8400);
    const dollarAmount1 = new DollarAmount(7);
    const line2 = new MoneyLine(+8500);
    const dollarAmount2 = new DollarAmount(10);
    bookSide1.addBet(betId, new LineDollarAmountPair(line1, dollarAmount1));
    bookSide1.addBet(betId, new LineDollarAmountPair(line2, dollarAmount2));
    }

    let bookSide2 = new ExplicitBookSide(Side.Bid);
    {
    const line1 = new MoneyLine(-1500);
    const dollarAmount1 = new DollarAmount(5);
    const line2 = new MoneyLine(-1490);
    const dollarAmount2 = new DollarAmount(10);
    bookSide2.addBet(betId, new LineDollarAmountPair(line1, dollarAmount1));
    bookSide2.addBet(betId, new LineDollarAmountPair(line2, dollarAmount2));
    }

    let bookSide3 = new ExplicitBookSide(Side.Bid);
    {
    const line1 = new MoneyLine(+4050);
    const dollarAmount1 = new DollarAmount(12);
    const line2 = new MoneyLine(+4100);
    const dollarAmount2 = new DollarAmount(15);
    bookSide3.addBet(betId, new LineDollarAmountPair(line1, dollarAmount1));
    bookSide3.addBet(betId, new LineDollarAmountPair(line2, dollarAmount2));
    }

    const implicitBookSide = new ImplicitOutrightBookSide(Side.Ask, [bookSide1, bookSide2, bookSide3]);
    // console.log(`${implicitBookSide.getLevels()}`);
    // TODO also test that the explicit books aren't modified by the implicit book getLevels() function, as there is a deepcopy
})

import { Line, MoneyLine, SpreadLine, TotalLine } from "../datatypes/Line";
import { Side } from "../datatypes/Side";

const bid = Side.Bid;
const ask = Side.Ask;

test('Test MoneyLine more aggressive', () => {
    // equal negative lines
    const l1 = new MoneyLine(-15000);
    const l2 = new MoneyLine(-15000);
    expect(l1.isMoreAggressive(bid, l2)).toBe(false);
    expect(l1.isMoreAggressive(ask, l2)).toBe(false);
    expect(l2.isMoreAggressive(bid, l1)).toBe(false);
    expect(l2.isMoreAggressive(ask, l1)).toBe(false);

    // equal positive lines
    const l3 = new MoneyLine(+10000);
    const l4 = new MoneyLine(+10000);
    expect(l3.isMoreAggressive(bid, l4)).toBe(false);
    expect(l3.isMoreAggressive(ask, l4)).toBe(false);
    expect(l4.isMoreAggressive(bid, l3)).toBe(false);
    expect(l4.isMoreAggressive(ask, l3)).toBe(false);

    // different negative lines
    const l5 = new MoneyLine(-18000);
    const l6 = new MoneyLine(-2000);
    expect(l5.isMoreAggressive(bid, l6)).toBe(true);
    expect(l5.isMoreAggressive(ask, l6)).toBe(false);
    expect(l6.isMoreAggressive(bid, l5)).toBe(false);
    expect(l6.isMoreAggressive(ask, l5)).toBe(true);

    // different positive lines
    const l7 = new MoneyLine(+18000);
    const l8 = new MoneyLine(+2000);
    expect(l7.isMoreAggressive(bid, l8)).toBe(false);
    expect(l7.isMoreAggressive(ask, l8)).toBe(true);
    expect(l8.isMoreAggressive(bid, l7)).toBe(true);
    expect(l8.isMoreAggressive(ask, l7)).toBe(false);

    // different positive and negative lines
    const l9 = new MoneyLine(-1100);
    const l10 = new MoneyLine(+1000);
    expect(l9.isMoreAggressive(bid, l10)).toBe(true);
    expect(l9.isMoreAggressive(ask, l10)).toBe(false);
    expect(l10.isMoreAggressive(bid, l9)).toBe(false);
    expect(l10.isMoreAggressive(ask, l9)).toBe(true);
})

test('Test MoneyLine less aggressive', () => {
    // equal negative lines
    const l1 = new MoneyLine(-15000);
    const l2 = new MoneyLine(-15000);
    expect(l1.isLessAggressive(bid, l2)).toBe(false);
    expect(l1.isLessAggressive(ask, l2)).toBe(false);
    expect(l2.isLessAggressive(bid, l1)).toBe(false);
    expect(l2.isLessAggressive(ask, l1)).toBe(false);

    // equal positive lines
    const l3 = new MoneyLine(+1000);
    const l4 = new MoneyLine(+1000);
    expect(l3.isLessAggressive(bid, l4)).toBe(false);
    expect(l3.isLessAggressive(ask, l4)).toBe(false);
    expect(l4.isLessAggressive(bid, l3)).toBe(false);
    expect(l4.isLessAggressive(ask, l3)).toBe(false);

    // different negative lines
    const l5 = new MoneyLine(-18000);
    const l6 = new MoneyLine(-2000);
    expect(l5.isLessAggressive(bid, l6)).toBe(false);
    expect(l5.isLessAggressive(ask, l6)).toBe(true);
    expect(l6.isLessAggressive(bid, l5)).toBe(true);
    expect(l6.isLessAggressive(ask, l5)).toBe(false);

    // different positive lines
    const l7 = new MoneyLine(+18000);
    const l8 = new MoneyLine(+2000);
    expect(l7.isLessAggressive(bid, l8)).toBe(true);
    expect(l7.isLessAggressive(ask, l8)).toBe(false);
    expect(l8.isLessAggressive(bid, l7)).toBe(false);
    expect(l8.isLessAggressive(ask, l7)).toBe(true);

    // different positive and negative lines
    const l9 = new MoneyLine(-1100);
    const l10 = new MoneyLine(+1000);
    expect(l9.isLessAggressive(bid, l10)).toBe(false);
    expect(l9.isLessAggressive(ask, l10)).toBe(true);
    expect(l10.isLessAggressive(bid, l9)).toBe(true);
    expect(l10.isLessAggressive(ask, l9)).toBe(false);
})

test('Test MoneyLine is equal', () => {
    // equal negative lines
    const l1 = new MoneyLine(-15000);
    const l2 = new MoneyLine(-15000);
    expect(l1.isEqual(l2)).toBe(true);
    expect(l1.isEqual(l2)).toBe(true);
    expect(l2.isEqual(l1)).toBe(true);
    expect(l2.isEqual(l1)).toBe(true);

    // equal positive lines
    const l3 = new MoneyLine(+1000);
    const l4 = new MoneyLine(+1000);
    expect(l3.isEqual(l4)).toBe(true);
    expect(l3.isEqual(l4)).toBe(true);
    expect(l4.isEqual(l3)).toBe(true);
    expect(l4.isEqual(l3)).toBe(true);

    // different negative lines
    const l5 = new MoneyLine(-18000);
    const l6 = new MoneyLine(-2000);
    expect(l5.isEqual(l6)).toBe(false);
    expect(l5.isEqual(l6)).toBe(false);
    expect(l6.isEqual(l5)).toBe(false);
    expect(l6.isEqual(l5)).toBe(false);

    // different positive lines
    const l7 = new MoneyLine(+18000);
    const l8 = new MoneyLine(+2000);
    expect(l7.isEqual(l8)).toBe(false);
    expect(l7.isEqual(l8)).toBe(false);
    expect(l8.isEqual(l7)).toBe(false);
    expect(l8.isEqual(l7)).toBe(false);

    // different positive and negative lines
    const l9 = new MoneyLine(-1100);
    const l10 = new MoneyLine(+1000);
    expect(l9.isEqual(l10)).toBe(false);
    expect(l9.isEqual(l10)).toBe(false);
    expect(l10.isEqual(l9)).toBe(false);
    expect(l10.isEqual(l9)).toBe(false);
})


test('Test TotalLine more aggressive', () => {
    // equal positive lines
    const l3 = new TotalLine(+100);
    const l4 = new TotalLine(+100);
    expect(l3.isMoreAggressive(bid, l4)).toBe(false);
    expect(l3.isMoreAggressive(ask, l4)).toBe(false);
    expect(l4.isMoreAggressive(bid, l3)).toBe(false);
    expect(l4.isMoreAggressive(ask, l3)).toBe(false);

    // different positive lines
    const l7 = new TotalLine(+5);
    const l8 = new TotalLine(+10);
    expect(l7.isMoreAggressive(bid, l8)).toBe(false);
    expect(l7.isMoreAggressive(ask, l8)).toBe(true);
    expect(l8.isMoreAggressive(bid, l7)).toBe(true);
    expect(l8.isMoreAggressive(ask, l7)).toBe(false);
})

test('Test TotalLine less aggressive', () => {
    // equal positive lines
    const l3 = new TotalLine(+100);
    const l4 = new TotalLine(+100);
    expect(l3.isLessAggressive(bid, l4)).toBe(false);
    expect(l3.isLessAggressive(ask, l4)).toBe(false);
    expect(l4.isLessAggressive(bid, l3)).toBe(false);
    expect(l4.isLessAggressive(ask, l3)).toBe(false);

    // different positive lines
    const l7 = new TotalLine(+5);
    const l8 = new TotalLine(+10);
    expect(l7.isLessAggressive(bid, l8)).toBe(true);
    expect(l7.isLessAggressive(ask, l8)).toBe(false);
    expect(l8.isLessAggressive(bid, l7)).toBe(false);
    expect(l8.isLessAggressive(ask, l7)).toBe(true);
})

test('Test TotalLine is equal', () => {
    // equal positive lines
    const l3 = new TotalLine(+100);
    const l4 = new TotalLine(+100);
    expect(l3.isEqual(l4)).toBe(true);
    expect(l3.isEqual(l4)).toBe(true);
    expect(l4.isEqual(l3)).toBe(true);
    expect(l4.isEqual(l3)).toBe(true);

    // different positive lines
    const l7 = new TotalLine(+5);
    const l8 = new TotalLine(+10);
    expect(l7.isEqual(l8)).toBe(false);
    expect(l7.isEqual(l8)).toBe(false);
    expect(l8.isEqual(l7)).toBe(false);
    expect(l8.isEqual(l7)).toBe(false);
})

test('Test MoneyLine canMatchAgainst', () => {
    const l1 = new MoneyLine(-5000);

    const l2 = new MoneyLine(+4990);
    expect(l1.canMatchAgainst(Side.Bid, l2)).toBe(true);
    expect(l2.canMatchAgainst(Side.Bid, l1)).toBe(true);
    expect(l1.canMatchAgainst(Side.Ask, l2)).toBe(true);
    expect(l2.canMatchAgainst(Side.Ask, l1)).toBe(true);

    const l3 = new MoneyLine(+5000);
    expect(l1.canMatchAgainst(Side.Bid, l3)).toBe(true);
    expect(l3.canMatchAgainst(Side.Bid, l1)).toBe(true);
    expect(l1.canMatchAgainst(Side.Ask, l3)).toBe(true);
    expect(l3.canMatchAgainst(Side.Ask, l1)).toBe(true);

    const l4 = new MoneyLine(+5010);
    expect(l1.canMatchAgainst(Side.Bid, l4)).toBe(false);
    expect(l4.canMatchAgainst(Side.Bid, l1)).toBe(false);
    expect(l1.canMatchAgainst(Side.Ask, l4)).toBe(false);
    expect(l4.canMatchAgainst(Side.Ask, l1)).toBe(false);

    const l5 = new MoneyLine(+2500);

    const l6 = new MoneyLine(-2490);
    expect(l5.canMatchAgainst(Side.Bid, l6)).toBe(false);
    expect(l6.canMatchAgainst(Side.Bid, l5)).toBe(false);
    expect(l5.canMatchAgainst(Side.Ask, l6)).toBe(false);
    expect(l6.canMatchAgainst(Side.Ask, l5)).toBe(false);

    const l7 = new MoneyLine(-2500);
    expect(l5.canMatchAgainst(Side.Bid, l7)).toBe(true);
    expect(l7.canMatchAgainst(Side.Bid, l5)).toBe(true);
    expect(l5.canMatchAgainst(Side.Ask, l7)).toBe(true);
    expect(l7.canMatchAgainst(Side.Ask, l5)).toBe(true);

    const l8 = new MoneyLine(-2510);
    expect(l5.canMatchAgainst(Side.Bid, l8)).toBe(true);
    expect(l8.canMatchAgainst(Side.Bid, l5)).toBe(true);
    expect(l5.canMatchAgainst(Side.Ask, l8)).toBe(true);
    expect(l8.canMatchAgainst(Side.Ask, l5)).toBe(true);
})

test('Test SpreadLine canMatchAgainst', () => {
    const l1 = new SpreadLine(-140);

    const l2 = new SpreadLine(+135);
    const l3 = new SpreadLine(+140);
    const l4 = new SpreadLine(+145);

    const l1Other = new SpreadLine(-5);

    expect(l1.canMatchAgainst(Side.Bid, l2)).toBe(true);
    expect(l2.canMatchAgainst(Side.Bid, l1)).toBe(true);
    expect(l1.canMatchAgainst(Side.Ask, l2)).toBe(true);
    expect(l2.canMatchAgainst(Side.Ask, l1)).toBe(true);
    expect(l1.canMatchAgainst(Side.Bid, l3)).toBe(true);
    expect(l3.canMatchAgainst(Side.Bid, l1)).toBe(true);
    expect(l1.canMatchAgainst(Side.Ask, l3)).toBe(true);
    expect(l3.canMatchAgainst(Side.Ask, l1)).toBe(true);
    expect(l1.canMatchAgainst(Side.Bid, l4)).toBe(false);
    expect(l4.canMatchAgainst(Side.Bid, l1)).toBe(false);
    expect(l1.canMatchAgainst(Side.Ask, l4)).toBe(false);
    expect(l4.canMatchAgainst(Side.Ask, l1)).toBe(false);
    expect(l1.canMatchAgainst(Side.Ask, l1Other)).toBe(true);
    expect(l1Other.canMatchAgainst(Side.Ask, l1)).toBe(true);
    expect(l1.canMatchAgainst(Side.Ask, l1Other)).toBe(true);
    expect(l1Other.canMatchAgainst(Side.Ask, l1)).toBe(true);

    const l5 = new SpreadLine(0);

    const l6 = new SpreadLine(-5);
    const l7 = new SpreadLine(0);
    const l8 = new SpreadLine(+5);

    expect(l5.canMatchAgainst(Side.Bid, l6)).toBe(true);
    expect(l6.canMatchAgainst(Side.Bid, l5)).toBe(true);
    expect(l5.canMatchAgainst(Side.Ask, l6)).toBe(true);
    expect(l6.canMatchAgainst(Side.Ask, l5)).toBe(true);
    expect(l5.canMatchAgainst(Side.Bid, l7)).toBe(true);
    expect(l7.canMatchAgainst(Side.Bid, l5)).toBe(true);
    expect(l5.canMatchAgainst(Side.Ask, l7)).toBe(true);
    expect(l7.canMatchAgainst(Side.Ask, l5)).toBe(true);
    expect(l5.canMatchAgainst(Side.Bid, l8)).toBe(false);
    expect(l8.canMatchAgainst(Side.Bid, l5)).toBe(false);
    expect(l5.canMatchAgainst(Side.Ask, l8)).toBe(false);
    expect(l8.canMatchAgainst(Side.Ask, l5)).toBe(false);

    const l9 = new SpreadLine(+20);

    const l10 = new SpreadLine(-15);
    const l11 = new SpreadLine(-20);
    const l12 = new SpreadLine(-25);
    const l13 = new SpreadLine(+5);

    expect(l9.canMatchAgainst(Side.Bid, l10)).toBe(false);
    expect(l10.canMatchAgainst(Side.Bid, l9)).toBe(false);
    expect(l9.canMatchAgainst(Side.Ask, l10)).toBe(false);
    expect(l10.canMatchAgainst(Side.Ask, l9)).toBe(false);
    expect(l9.canMatchAgainst(Side.Bid, l11)).toBe(true);
    expect(l11.canMatchAgainst(Side.Bid, l9)).toBe(true);
    expect(l9.canMatchAgainst(Side.Ask, l11)).toBe(true);
    expect(l11.canMatchAgainst(Side.Ask, l9)).toBe(true);
    expect(l9.canMatchAgainst(Side.Bid, l12)).toBe(true);
    expect(l12.canMatchAgainst(Side.Bid, l9)).toBe(true);
    expect(l9.canMatchAgainst(Side.Ask, l12)).toBe(true);
    expect(l12.canMatchAgainst(Side.Ask, l9)).toBe(true);
    expect(l9.canMatchAgainst(Side.Bid, l13)).toBe(false);
    expect(l13.canMatchAgainst(Side.Bid, l9)).toBe(false);
    expect(l9.canMatchAgainst(Side.Ask, l13)).toBe(false);
    expect(l13.canMatchAgainst(Side.Ask, l9)).toBe(false);
})

test('Test TotalLine canMatchAgainst when a bid crosses into ask', () => {
    const bid = new TotalLine(45);
    const ask1 = new TotalLine(40);
    const ask2 = new TotalLine(45);
    const ask3 = new TotalLine(50);

    expect(ask1.canMatchAgainst(Side.Bid, bid)).toBe(true);
    expect(ask2.canMatchAgainst(Side.Bid, bid)).toBe(true);
    expect(ask3.canMatchAgainst(Side.Bid, bid)).toBe(false);
})

test('Test TotalLine canMatchAgainst when a ask crosses into bid', () => {
    const ask = new TotalLine(45);
    const bid1 = new TotalLine(40);
    const bid2 = new TotalLine(45);
    const bid3 = new TotalLine(50);

    expect(bid1.canMatchAgainst(Side.Ask, ask)).toBe(false);
    expect(bid2.canMatchAgainst(Side.Ask, ask)).toBe(true);
    expect(bid3.canMatchAgainst(Side.Ask, ask)).toBe(true);
})

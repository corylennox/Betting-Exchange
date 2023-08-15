import { isValidWagerOrWin, convertToIntegerScale, convertToPriceString } from "./BetslipUtils";

test('Validates string price with no decimals', () => {
    expect(isValidWagerOrWin("324")).toBe(true)
})

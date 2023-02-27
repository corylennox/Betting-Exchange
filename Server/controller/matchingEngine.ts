import { Book } from '../src/datatypes/Book';
import { Side } from '../src/datatypes/Side';
import { UserSubmittedBet, UserSubmittedBetResult } from '../src/datatypes/UserSubmittedBet';
import { Line, LineType, MoneyLine, SpreadLine, TotalLine } from '../src/datatypes/Line';
import { ExplicitBookSide } from '../src/datatypes/BookSide';
import { LineDollarAmountPair } from '../src/datatypes/LineDollarAmountPair';
import { Match } from '../src/datatypes/Match';
import { cloneable } from '../src/utils/cloneable';
import { SportsBets } from '../src/Data';
import { DollarAmount } from '../src/datatypes/DollarAmount';

function createBook(lineType: LineType): Book {
    const bid = new ExplicitBookSide(Side.Bid);
    const ask = new ExplicitBookSide(Side.Ask);
    return new Book(lineType, bid, ask);
}

// Provides information to tie a frontend buttonId to a Book and the side that the buttonId corresponds to
class ButtonIdBookInfo {
    book: Book
    side: Side
}

class MatchingEngineController {
    buttonIdToBookInfo: Map<number /* buttonId */, ButtonIdBookInfo>

    // initialze a matching engine for each sport bet
    constructor(sportsBets: Map<string, any>) {
        this.buttonIdToBookInfo = new Map<number, ButtonIdBookInfo>;

        sportsBets.forEach((sportBets: any, sportTitle: string) => {
            sportBets.tabs.forEach((tab: any) => {
                tab.availableBets.forEach((availableBet: any) => {
                    if (availableBet.type == "OutrightBet") {
                        availableBet.contendersData.forEach((contenderData: any) => {
                            let book = createBook(LineType.Money);
                            let bookInfo = new ButtonIdBookInfo();
                            bookInfo.book = book;
                            bookInfo.side = Side.Bid;
                            this.buttonIdToBookInfo[contenderData.buttonId] = bookInfo;
                        })
                    }
                    else if (availableBet.type = "GameBet") {
                        const contender1Data = availableBet.contender1Data
                        const contender2Data = availableBet.contender2Data
                        {
                            let spreadBook = createBook(LineType.Spread);

                            let spreadBookBidInfo = new ButtonIdBookInfo();
                            spreadBookBidInfo.book = spreadBook;
                            spreadBookBidInfo.side = Side.Bid;
                            this.buttonIdToBookInfo[contender1Data.spreadButtonId] = spreadBookBidInfo;

                            let spreadBookAskInfo = new ButtonIdBookInfo();
                            spreadBookAskInfo.book = spreadBook;
                            spreadBookAskInfo.side = Side.Ask;
                            this.buttonIdToBookInfo[contender2Data.spreadButtonId] = spreadBookAskInfo;
                        }
                        {
                            let moneyBook = createBook(LineType.Money);

                            let moneyBookBidInfo = new ButtonIdBookInfo();
                            moneyBookBidInfo.book = moneyBook;
                            moneyBookBidInfo.side = Side.Bid;
                            this.buttonIdToBookInfo[contender1Data.moneyButtonId] = moneyBookBidInfo;

                            let moneyBookAskInfo = new ButtonIdBookInfo();
                            moneyBookAskInfo.book = moneyBook;
                            moneyBookAskInfo.side = Side.Ask;
                            this.buttonIdToBookInfo[contender2Data.moneyButtonId] = moneyBookAskInfo;
                        }
                        {
                            let totalBook = createBook(LineType.Total);

                            let totalBookBidInfo = new ButtonIdBookInfo();
                            totalBookBidInfo.book = totalBook;
                            totalBookBidInfo.side = Side.Bid;
                            this.buttonIdToBookInfo[contender1Data.totalButtonId] = totalBookBidInfo;

                            let totalBookAskInfo = new ButtonIdBookInfo();
                            totalBookAskInfo.book = totalBook;
                            totalBookAskInfo.side = Side.Ask;
                            this.buttonIdToBookInfo[contender2Data.totalButtonId] = totalBookAskInfo;
                        }
                    }
                })
            })
        })
    }

    addBet(betId: bigint, submittedBet: UserSubmittedBet): UserSubmittedBetResult {
        let result = new UserSubmittedBetResult
        result.submittedBet = submittedBet;
        result.betId = betId;

        let buttonIdBookInfo = this.buttonIdToBookInfo[submittedBet.buttonId];
        const lineDollarAmountPairCopy = new LineDollarAmountPair(cloneable.deepCopy(submittedBet.line), cloneable.deepCopy(submittedBet.wagerAmount));
        const addBetResult: [Array<Match>, DollarAmount] | boolean = buttonIdBookInfo.book.addBet(buttonIdBookInfo.side, betId,
            lineDollarAmountPairCopy,
            submittedBet.restingType);

        // check for an error upon submission
        if (addBetResult instanceof Boolean) {
            result.success = false
        }
        else {
            result.success = true;
            result.matches = addBetResult[0];
            result.cancelledWagerAmount = addBetResult[1];
        }

        return result;
    }

    getLineFromLegacyLine(buttonId: number, legacyLine: number): Line {
        const book = this.buttonIdToBookInfo[buttonId].book;
        const lineType = book.getLineType();
        if (lineType == LineType.Money) {
            return new MoneyLine(legacyLine);
        }
        else if (lineType == LineType.Spread) {
            return new SpreadLine(legacyLine);
        }
        else if (lineType == LineType.Total) {
            return new TotalLine(legacyLine);
        }
        return null;
    }
}

const matchingEngineController = new MatchingEngineController(SportsBets);
export default matchingEngineController;

import betSubmissionService from '../service/betSubmission';
import { Line } from '../src/datatypes/Line';
import { DollarAmount } from '../src/datatypes/DollarAmount';
import { RestingType } from '../src/datatypes/RestingType';
import { Match } from '../src/datatypes/Match';
import { UserSubmittedBet, UserSubmittedBetResult } from '../src/datatypes/UserSubmittedBet';
import matchingEngineController from './matchingEngine';
import {determineWin, getWinAfterCommission, getCommissionFromWager } from "bettingexchangecommon/wagerWinUtils";
import { BetSubmissionStatusDbEnum } from '../dao/betSubmission';
import { assert } from 'console';
import fillController from './fillSubmission';

function userHasAdequateFunds(userId: string, amount: DollarAmount) {
    // TODO implement
    return true;
}

class BetSubmissionController {
    async createBetSubmissions(submittedBets: Array<UserSubmittedBet>): Promise<Array<UserSubmittedBetResult>> {
        let submittedBetResults = new Array<UserSubmittedBetResult>
        let submittedBetIds = [];

        for (let i = 0; i < submittedBets.length; i++) {
            submittedBetResults.push(new UserSubmittedBetResult());
            submittedBetResults[i].submittedBet = submittedBets[i];
            submittedBetResults[i].success = false;
        }

        const timestampInNanoseconds = Date.now() * 1000000;

        let betSubmissionPromises = []
        try {
            // Submit to database, then matching engine
            for (const [i, bet] of submittedBets.entries()) {
                const commission = new DollarAmount(getCommissionFromWager(bet.wagerAmount.value));

                if (!userHasAdequateFunds(bet.userId, new DollarAmount(bet.wagerAmount.value + commission.value)))
                {
                    // TODO handle inadequate funds
                }

                const betId = await betSubmissionService.createBetSubmission(
                    {
                        userId: bet.userId,
                        buttonId: bet.buttonId,
                        line: bet.line.value, //TODO: get line from buttonId on backend
                        wagerAmount: bet.wagerAmount.value,
                        totalPayout: 0, // TODO I think this should be deleted because we don't know totalPayout as it could be a market order or it could match against lines that are better or equal to given line
                        commission: commission.value,
                        timePlaced: timestampInNanoseconds,
                    });
                submittedBetIds.push(betId);

                let submittedBetResult = matchingEngineController.addBet(BigInt(betId), bet);
                if (submittedBetResult.success) {
                    submittedBetResults[i] = submittedBetResult;
                }
            }

            // Update database with results from matching engine
            for (const betResult of submittedBetResults) {
                if (betResult.success) {
                    const betId = Number(betResult.betId);
                    const bet = betResult.submittedBet;

                    betSubmissionService.updateBetSubmissionStatus(betId, BetSubmissionStatusDbEnum.SubmittedToMatchingEngine);

                    let submittedBetFullyFilled = false;

                    // Iterate over matches to update the db as necessary with match information
                    for (const [i, match] of betResult.matches.entries()) {
                        const fillId = await fillController.createFill(match);

                        if (match.aggressiveFullyFilled) {
                            submittedBetFullyFilled = true;
                            assert(i == submittedBetResults.length - 1, "There shouldn't be any more aggressive matches following the match that fully filled the aggressor");
                        }
                        if (match.passiveFullyFilled) {
                            betSubmissionService.updateBetSubmissionStatus(betId, BetSubmissionStatusDbEnum.FullyFilled);
                        }
                    }

                    if (submittedBetFullyFilled) {
                        betSubmissionService.updateBetSubmissionStatus(betId, BetSubmissionStatusDbEnum.FullyFilled);
                    }
                    else {
                        switch(bet.restingType) {
                            case RestingType.Limit:
                                betSubmissionService.updateBetSubmissionStatus(betId, BetSubmissionStatusDbEnum.RestingOnMatchingEngine);
                                break;
                            case RestingType.Market:
                                betSubmissionService.updateBetSubmissionStatus(betId, BetSubmissionStatusDbEnum.CancelledByExchange);
                                break;
                            default:
                                // This default case is for any unhandled restingType
                                // const exhaustiveCheck: never = c;
                                throw new Error(`Unhandled RestingType case: ${bet.restingType}`);
                        }
                    }
                }
            }

            return submittedBetResults;
        } catch (err) {
            console.error(`Error processing submitted bets. ${submittedBetResults}. Stack trace: ${err.stack}`);
            return submittedBetResults;
        }
    }
}

const betSubmissionController = new BetSubmissionController();
export default betSubmissionController;

import betSubmissionService from '../service/betSubmission';
import { Line } from '../src/datatypes/Line';
import { DollarAmount } from '../src/datatypes/DollarAmount';
import { RestingType } from '../src/datatypes/RestingType';
import { Match } from '../src/datatypes/Match';
import { UserSubmittedBet, UserSubmittedBetResult } from '../src/datatypes/UserSubmittedBet';
import matchingEngineController from './matchingEngine';
import {determineWin, getWinAfterCommission, getCommissionFromWager } from "../bettingexchangecommon/wagerWinUtils";
import { BetSubmissionStatusDbEnum } from '../dao/betSubmission';
import { assert } from 'console';
import fillController from './fillSubmission';
import balancesController from './balances';

async function userHasAdequateFunds(userId: string, amount: DollarAmount) {
    const availableBalance: DollarAmount = await balancesController.getAvailableBalance(userId);
    return availableBalance.isGreater(amount) || availableBalance.isEqual(amount);
}

class BetSubmissionController {
    betIdToUserIdMap = new Map<BigInt, string>;

    async createBetSubmissions(userId: string, submittedBets: Array<UserSubmittedBet>): Promise<Array<UserSubmittedBetResult>> {
        let submittedBetResults = new Array<UserSubmittedBetResult>
        let submittedBetIds = [];

        for (let i = 0; i < submittedBets.length; i++) {
            submittedBetResults.push(new UserSubmittedBetResult());
            submittedBetResults[i].submittedBet = submittedBets[i];
            submittedBetResults[i].success = false;
        }

        let commissions = new Array<DollarAmount>();
        let totalRequiredBalance = new DollarAmount(0);
        for (const [i, bet] of submittedBets.entries()) {
            commissions.push(new DollarAmount(getCommissionFromWager(bet.wagerAmount.value)));
            totalRequiredBalance.add(bet.wagerAmount);
            totalRequiredBalance.add(commissions[i]);
        }

        const timestampInNanoseconds = Date.now() * 1000000;

        let betSubmissionPromises = []
        try {
            const hasAdequateFunds: boolean = await userHasAdequateFunds(userId, totalRequiredBalance);
            if (!hasAdequateFunds)
                return submittedBetResults;

            // Submit to database, then matching engine
            for (const [i, bet] of submittedBets.entries()) {
                const commission = commissions[i];

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
        } catch (err) {
            console.error(`Error processing submitted bets. ${submittedBetResults}. Stack trace: ${err.stack}`);
        }

        for (const submittedBetId of submittedBetIds) {
            this.betIdToUserIdMap.set(submittedBetId, userId);
        }

        /**
         * Actually execute the transfers from available to escrow in the database based on any matches. And remove any commission from the user's bet.
         */
        for (const submittedBetResult of submittedBetResults) {
            if (submittedBetResult.success) {
                let restingOrMatchedAmount: DollarAmount = new DollarAmount(submittedBetResult.submittedBet.wagerAmount.value - submittedBetResult.cancelledWagerAmount.value);
                await balancesController.transferFromAvailableToEscrow(userId, restingOrMatchedAmount);

                const betCommission = new DollarAmount(getCommissionFromWager(restingOrMatchedAmount.value));
                const availableBalance = await balancesController.getAvailableBalance(userId);
                const avaialbleBalanceAfterCommission = new DollarAmount(availableBalance.value - betCommission.value);
                await balancesController.setAvailableBalance(userId, avaialbleBalanceAfterCommission);
            }
        }
        return submittedBetResults;
    }
}

const betSubmissionController = new BetSubmissionController();
export default betSubmissionController;

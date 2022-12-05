import betSubmissionService from '../service/betSubmission';
import {determineWin, getWinAfterCommission} from "bettingexchangecommon/wagerWinUtils";

class BetSubmissionController {
    async createBetSubmissions(submittedBets, userId) {
        const timestampInNanoseconds = Date.now() * 1000000;

        let betSubmissionPromises = []
        let winAmount = 0
        let line = 0;
        try {
            submittedBets.forEach((bet) => {

                betSubmissionPromises.push(
                    betSubmissionService.createBetSubmission(
                    {
                        userId: userId,
                        buttonId: bet.buttonId,
                        line: bet.line, //replace with getLine(bet.buttonId)
                        wagerAmount: bet.wagerAmount,
                        totalPayout: bet.wagerAmount + 5000, //replace with calculateWin(bet.buttonId, bet.wagerAmount)
                        commission: Math.ceil(bet.wagerAmount * 0.01),
                        timePlaced: timestampInNanoseconds,
                    })
                );
            });

            let returnedButtonIds = [];
            await Promise.all(betSubmissionPromises).then((buttonIds) => {
                buttonIds.forEach((buttonId) => {
                    returnedButtonIds.push(buttonId.button_id);
                })
            });
            return returnedButtonIds;
        } catch (err) {
            console.log(err);
            return []
        }
    }
}

const betSubmissionController = new BetSubmissionController();
export default betSubmissionController;

import betSubmissionService from '../service/betSubmission';
import {determineWin, getWinAfterCommission} from "bettingexchangecommon/wagerWinUtils";

class BetSubmissionController {
    async createBetSubmissions(submittedBets, userId) {
        const timestampInNanoseconds = Date.now() * 1000000;

        let betSubmissionPromises = []
        try {
            submittedBets.forEach((bet) => {

                betSubmissionPromises.push(
                    betSubmissionService.createBetSubmission(
                    {
                        userId: userId,
                        buttonId: bet.buttonId,
                        line: bet.line, //TODO: get line from buttonId on backend
                        wagerAmount: bet.wagerAmount,
                        totalPayout: bet.wagerAmount * 2, //TODO: get totalPayout from buttonId on backend
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

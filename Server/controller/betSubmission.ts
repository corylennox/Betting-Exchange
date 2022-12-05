import betSubmissionService from '../service/betSubmission';

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
                        timePlaced: timestampInNanoseconds,
                        wagerAmount: bet.wagerAmount,
                        totalPayout: 10,  //TODO: calculate payout using wager and line
                        line: bet.line,
                        buttonId: bet.buttonId
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

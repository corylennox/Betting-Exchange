const betSubmissionService = require('../service/betSubmission');

class BetSubmissionController {
    async createBetSubmissions(submittedBets) {
        const timestampInNanoseconds = Date.now() * 1000000;

        let betSubmissionPromises = []

        try {
            submittedBets.forEach((bet) => {
                betSubmissionPromises.push(
                    betSubmissionService.createBetSubmission(
                    {
                        userId: 3,
                        timePlaced: timestampInNanoseconds,
                        wagerAmount: bet.wagerAmount,
                        totalPayout: bet.totalPayout,
                        line: bet.line,
                        buttonId: bet.buttonId
                    })
                );
            });

            let submittedBetIds = [];
            await Promise.all(betSubmissionPromises).then((betIds) => {
                betIds.forEach((betId) => {
                    submittedBetIds.push(betId.id);
                })
            });
            return submittedBetIds;
        } catch (err) {
            console.log(err);
            return []
        }
    }
}

module.exports = new BetSubmissionController();

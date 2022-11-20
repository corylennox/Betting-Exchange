const betSubmissionDAO = require('../dao/betSubmission');

class BetSubmissionService {
    createBetSubmission(betSubmissionDto) {
        const { userId, timePlaced, wagerAmount, totalPayout, line, buttonId } = betSubmissionDto;
        return betSubmissionDAO.createBetSubmission(userId, timePlaced, wagerAmount, totalPayout, line, buttonId);
    }
}

module.exports = new BetSubmissionService();

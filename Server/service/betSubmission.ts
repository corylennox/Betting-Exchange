import betSubmissionDAO from '../dao/betSubmission';

class BetSubmissionService {
    createBetSubmission(betSubmissionDto) {
        const { userId, timePlaced, wagerAmount, totalPayout, line, buttonId } = betSubmissionDto;
        return betSubmissionDAO.createBetSubmission(userId, timePlaced, wagerAmount, totalPayout, line, buttonId);
    }
}

const betSubmissionService = new BetSubmissionService();
export default betSubmissionService;

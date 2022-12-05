import betSubmissionDAO from '../dao/betSubmission';

class BetSubmissionService {
    createBetSubmission(betSubmissionDto) {
        const { userId, buttonId, line, wagerAmount, totalPayout, commission, timePlaced } = betSubmissionDto;
        return betSubmissionDAO.createBetSubmission(userId, buttonId, line, wagerAmount, totalPayout, commission, timePlaced);
    }
}

const betSubmissionService = new BetSubmissionService();
export default betSubmissionService;

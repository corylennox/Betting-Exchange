import betSubmissionDAO, { BetSubmissionStatusDbEnum } from '../dao/betSubmission';

class BetSubmissionService {
    async createBetSubmission(betSubmissionDto) {
        const { userId, buttonId, line, wagerAmount, totalPayout, commission, timePlaced } = betSubmissionDto;
        return betSubmissionDAO.createBetSubmission(userId, buttonId, line, wagerAmount, totalPayout, commission, timePlaced);
    }

    async updateBetSubmissionStatus(betId: number, status: BetSubmissionStatusDbEnum) {
        return betSubmissionDAO.updateBetSubmissionStatus(betId, status);
    }
}

const betSubmissionService = new BetSubmissionService();
export default betSubmissionService;

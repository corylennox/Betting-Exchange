import db from '../db/db';

class BetSubmissionDAO {
    async createBetSubmission(
        userId, buttonId, line, wagerAmount, totalPayout, commission, timePlaced) {
        const [ButtonId] = await db('confirmed_bets')
            .insert({
                user_id: userId,
                button_id: buttonId,
                line,
                wager_amount: wagerAmount,
                total_payout: totalPayout,
                commission: commission,
                time_placed: timePlaced,
            })
            .returning('button_id');

        return ButtonId;
    }
}

const betSubmissionDAO = new BetSubmissionDAO()
export default betSubmissionDAO;

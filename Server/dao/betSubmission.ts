import db from '../db/db';

class BetSubmissionDAO {
    async createBetSubmission(
        userId, timePlaced, wagerAmount, totalPayout, line, buttonId) {
        const [id] = await db('confirmed_bets')
            .insert({
                user_id: userId,
                time_placed: timePlaced,
                wager_amount: wagerAmount,
                total_payout: totalPayout,
                line,
                button_id: buttonId,
            })
            .returning('id');

        return id;
    }
}

const betSubmissionDAO = new BetSubmissionDAO()
export default betSubmissionDAO;

const db = require('../db/db');

class BetSubmissionDAO {
    async createBetSubmission(
        userId, timePlaced, wagerAmount, totalPayout, line, buttonId) {
        const [id] = await db('bet_submission')
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

module.exports = new BetSubmissionDAO()

import db from '../db/db';

class BalancesDao {
    async createBalance(userId: string) {
        let [availableBalance] = await db('balances')
            .insert({
                user_id: userId
            })
            .returning('available_balance');

            availableBalance = availableBalance['available_balance'];

        return availableBalance; // auto-incremented database id. Not related to @email or @stripeAccountId
    }

    async getAvailableBalance(userId: string) {
        let [availableBalance] = await db('balances')
            .where('user_id', userId)
            .returning('available_balance');

        if (availableBalance)
            availableBalance = availableBalance['available_balance']

        return availableBalance;
    }

    async setAvailableBalance(userId: string, availableBalance: BigInt) {
        let [newAvailableBalance] = await db('balances')
            .where('user_id', userId)
            .update({
                available_balance: availableBalance,
            })
            .returning('available_balance');

        if (newAvailableBalance)
            newAvailableBalance = newAvailableBalance['available_balance']

        return newAvailableBalance;
    }
}

const balancesDao = new BalancesDao()
export default balancesDao;

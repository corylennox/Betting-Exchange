import { assert } from 'console';
import balancesDao from '../dao/balances';
import { DollarAmount } from '../src/datatypes/DollarAmount';

class BalancesService {
    async createBalance(userId: string) {
        return balancesDao.createBalance(userId);
    }

    async doesBalanceExist(userId: string) {
        const availableBalance: BigInt = await balancesDao.getAvailableBalance(userId);
        return !!availableBalance; // convert the bigint or undefined to a boolean true/false
    }

    async getAvailableBalance(userId: string) {
        const availableBalance: BigInt = await balancesDao.getAvailableBalance(userId);
        const doesBalanceExist: boolean = !!availableBalance;

        if (!doesBalanceExist) {
            return new DollarAmount(Number(await balancesDao.createBalance(userId)));
        }
        return new DollarAmount(Number(availableBalance));
    }

    async transferFromAvailableToEscrow(userId: string, amount: DollarAmount) {
        if (!(await this.doesBalanceExist(userId))) {
            await balancesDao.createBalance(userId);
        }

        const balances = await balancesDao.getBalances(userId);
        let availableBalance = new DollarAmount(Number(balances['available_balance']));
        let escrowBalance = new DollarAmount(Number(balances['escrow_balance']));
        assert(availableBalance.isGreater(amount) || availableBalance.isEqual(amount), `Available balance of ${availableBalance} cannot subtract requested amount ${amount}`);

        availableBalance.subtract(amount);
        escrowBalance.add(amount);

        await balancesDao.setAvailableBalance(userId, BigInt(availableBalance.value));
        await balancesDao.setEscrowBalance(userId, BigInt(escrowBalance.value));
        return true;
    }

    async setAvailableBalance(userId: string, availableBalance: DollarAmount) {
        const newAvailableBalance: BigInt = await balancesDao.setAvailableBalance(userId, BigInt(availableBalance.value));
        return new DollarAmount(Number(newAvailableBalance));
    }
}

const balancesService = new BalancesService();
export default balancesService;

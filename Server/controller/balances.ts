import { assert } from 'console';
import balancesService from '../service/balances';
import { DollarAmount } from '../src/datatypes/DollarAmount';

class BalancesController {
    async getAvailableBalance(userId: string) {
        return await balancesService.getAvailableBalance(userId);
    }

    async setAvailableBalance(userId: string, availableBalance: DollarAmount) {
        return await balancesService.setAvailableBalance(userId, availableBalance);
    }

    async transferFromAvailableToEscrow(userId: string, amount: DollarAmount) {
        return await balancesService.transferFromAvailableToEscrow(userId, amount);
    }
}

const balancesController = new BalancesController();
export default balancesController;

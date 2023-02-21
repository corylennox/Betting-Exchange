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
}

const balancesController = new BalancesController();
export default balancesController;

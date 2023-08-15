import fillDao, { SideDbEnum } from '../dao/fillSubmission';
import { Side } from '../src/datatypes/Side'
import { Match } from '../src/datatypes/Match';

class FillService {
    async createFill(match: Match) {
        return fillDao.createFill(
            match.aggressiveBetId,
            match.passiveBetId,
            match.aggressiveSide == Side.Bid ? SideDbEnum.Bid : SideDbEnum.Ask,
            BigInt(match.aggressiveWager.dollarAmount.value),
            BigInt(match.passiveWager.dollarAmount.value),
            BigInt(match.passiveWager.line.value),
            match.aggressiveFullyFilled,
            match.passiveFullyFilled);
    }
};

const fillService = new FillService();
export default fillService;

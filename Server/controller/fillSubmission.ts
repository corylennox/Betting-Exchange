import fillService from '../service/fillSubmission';
import { Match } from '../src/datatypes/Match';

class FillController {
    async createFill(match: Match) {
        return fillService.createFill(match);
    }
}

const fillController = new FillController();
export default fillController;

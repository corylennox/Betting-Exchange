import fetchBetsService from '../service/fetchBets';


class FetchBetsController {
    async fetchBets(userId) {
        return await fetchBetsService.fetchBets({userId});
    }
}

const fetchBetsController = new FetchBetsController();
export default fetchBetsController;

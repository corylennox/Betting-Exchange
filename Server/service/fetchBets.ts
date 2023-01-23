import fetchBetsDAO from '../dao/fetchBets';

class FetchBetsService {
    async fetchBets(fetchBetsDto) {
        const { userId } = fetchBetsDto;
        return await fetchBetsDAO.fetchBets(userId);
    }
}

const fetchBetsService = new FetchBetsService();
export default fetchBetsService;

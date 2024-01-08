import fetchButtonIdDetailsDAO from "../dao/fetchButtonIdDetails";

class FetchButtonIdDetailsService {
  async fetchButtonIdDetails(fetchButtonIdDetailsDto) {
    const { buttonId } = fetchButtonIdDetailsDto;
    return await fetchButtonIdDetailsDAO.fetchButtonIdDetails(buttonId);
  }
}

const fetchButtonIdDetailsService = new FetchButtonIdDetailsService();
export default fetchButtonIdDetailsService;

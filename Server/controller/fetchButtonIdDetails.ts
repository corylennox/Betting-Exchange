import fetchButtonIdDetailsService from "../service/fetchButtonIdDetails";

class FetchButtonIdDetailsController {
  async fetchButtonIdDetails(buttonId) {
    return await fetchButtonIdDetailsService.fetchButtonIdDetails({ buttonId });
  }
}

const fetchButtonIdDetailsController = new FetchButtonIdDetailsController();
export default fetchButtonIdDetailsController;

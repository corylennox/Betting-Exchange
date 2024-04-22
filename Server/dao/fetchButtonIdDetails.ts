import { db } from "@openbook/common";

class FetchButtonIdDetailsDAO {
  async fetchButtonIdDetails(buttonId) {
    const buttonIdDetails = {
      bet_title: "TODO: Boston Celtics +3",
      game_title: "TODO: Boston Celtics vs. Los Angeles Lakers",
      game_start_time: "TODO: 2020-12-25 20:00:00",
    };
    return buttonIdDetails;
  }
}

const fetchButtonIdDetailsDAO = new FetchButtonIdDetailsDAO();
export default fetchButtonIdDetailsDAO;

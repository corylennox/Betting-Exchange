import { db } from "@openbook/common";

class FetchBetsDAO {
  async fetchBets(userId) {
    const bets = await db("confirmed_bets").where("user_id", userId);
    return bets;
  }
}

const fetchBetsDAO = new FetchBetsDAO();
export default fetchBetsDAO;

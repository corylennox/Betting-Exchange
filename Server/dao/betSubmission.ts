import { db } from "@openbook/common";

export enum BetSubmissionStatusDbEnum {
  ReceivedByBackend = "received_by_backend",
  SubmittedToMatchingEngine = "submitted_to_matching_engine",
  RestingOnMatchingEngine = "resting_on_matching_engine",
  CancelledByExchange = "cancelled_by_exchange",
  CancelledByUser = "cancelled_by_user",
  FullyFilled = "fully_filled",
}

class BetSubmissionDAO {
  async createBetSubmission(
    userId: string,
    buttonId: bigint,
    line: bigint,
    wagerAmount: bigint,
    totalPayout: bigint,
    commission: bigint,
    timePlaced: bigint
  ) {
    console.time("confirmed_bets insert");
    let [betId] = await db("confirmed_bets")
      .insert({
        user_id: userId,
        button_id: buttonId,
        line,
        wager_amount: wagerAmount,
        total_payout: totalPayout,
        commission: commission,
        time_placed: timePlaced,
      })
      .returning("id");
    console.timeEnd("confirmed_bets insert");
    betId = betId["id"];

    return betId;
  }

  async updateBetSubmissionStatus(
    betId: number,
    status: BetSubmissionStatusDbEnum
  ) {
    return await db("confirmed_bets").where({ id: betId }).update({
      order_status: status,
    });
  }
}

const betSubmissionDAO = new BetSubmissionDAO();
export default betSubmissionDAO;

import { db } from "@openbook/common";

export enum SideDbEnum {
  Bid = "bid",
  Ask = "ask",
}

class FillDao {
  async createFill(
    aggressiveBetId: bigint,
    passiveBetId: bigint,
    aggressiveBookSide: SideDbEnum,
    aggressiveWagerAmount: bigint,
    passiveWagerAmount: bigint,
    passiveLine: bigint,
    aggressiveFullyFilled: boolean,
    passiveFullyFilled: boolean
  ) {
    console.time("fills insert");
    let [fillId] = await db("fills")
      .insert({
        aggressive_bet_id: aggressiveBetId,
        passive_bet_id: passiveBetId,
        aggressive_book_side: aggressiveBookSide,
        aggressive_wager_amount: aggressiveWagerAmount,
        passive_wager_amount: passiveWagerAmount,
        passive_line: passiveLine,
        aggressive_fully_filled: aggressiveFullyFilled,
        passive_fully_filled: passiveFullyFilled,
      })
      .returning("id");
    console.timeEnd("fills insert");
    fillId = fillId["id"];

    return fillId;
  }
}

const fillDao = new FillDao();
export default fillDao;

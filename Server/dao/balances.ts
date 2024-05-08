import { db } from "@openbook/common";

class BalancesDao {
  async createBalance(userId: string) {
    let [availableBalance] = await db("balances")
      .insert({
        user_id: userId,
      })
      .returning("available_balance");

    availableBalance = availableBalance["available_balance"];

    return availableBalance; // auto-incremented database id. Not related to @email or @stripeAccountId
  }

  async getAvailableBalance(userId: string) {
    let [availableBalance] = await db("balances")
      .where("user_id", userId)
      .returning("available_balance");

    if (availableBalance)
      availableBalance = availableBalance["available_balance"];

    return availableBalance;
  }

  async getEscrowBalance(userId: string) {
    let [escrowBalance] = await db("balances")
      .where("user_id", userId)
      .returning("escrow_balance");

    if (escrowBalance) escrowBalance = escrowBalance["escrow_balance"];

    return escrowBalance;
  }

  async getBalances(userId: string) {
    let [balances] = await db("balances")
      .where("user_id", userId)
      .returning(["available_balance", "escrow_balance"]);

    return balances;
  }

  async setAvailableBalance(userId: string, availableBalance: BigInt) {
    let [newAvailableBalance] = await db("balances")
      .where("user_id", userId)
      .update({
        available_balance: availableBalance,
      })
      .returning("available_balance");

    if (newAvailableBalance)
      newAvailableBalance = newAvailableBalance["available_balance"];

    return newAvailableBalance;
  }

  async setEscrowBalance(userId: string, escrowBalance: BigInt) {
    let [newEscrowBalance] = await db("balances")
      .where("user_id", userId)
      .update({
        escrow_balance: escrowBalance,
      })
      .returning("available_balance");

    if (newEscrowBalance)
      newEscrowBalance = newEscrowBalance["available_balance"];

    return newEscrowBalance;
  }
}

const balancesDao = new BalancesDao();
export default balancesDao;
